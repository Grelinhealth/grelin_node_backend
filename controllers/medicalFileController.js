const logger = require("../config/loggerApi.js");
const multer = require("multer");
const path = require("path");
const jwtDecodeService = require("../services/jwtDecodeService");
const medicalFileService = require("../services/medicalFileService");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|PDF|text\/plain/;
    const mimType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimType && extname) {
      return cb(null, true);
    }
    cb("give proper files format to upload");
    logger.error(
      "Error -caseDocumentcontroller - upload:",
      "give proper files format to upload"
    );
  },
});

const uploadFile = async (req, res) => {
  try {
    logger.info("Enter in medicalFileController - uploadFile");
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7); // removes "Bearer " (including the space)
    }
     let decodeValue= await jwtDecodeService.deocdeJwtToken(token);
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    const result = await medicalFileService.uploadFile(req,decodeValue,res);
    if (result) {
      return res.status(200).json({
        message: "File processed successfully",
        extractedText: result,
      });
    } else {
      return res.status(400).json({
        message: "File not processed successfully",
      });
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    res.status(500).json({ message: "Failed to extract text from file" });
  }
};

module.exports = {
  upload,
  uploadFile,
};
