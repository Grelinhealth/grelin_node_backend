const logger = require("../config/loggerApi.js");
const { generateUniqueFilename } = require("../constant.js");
const pdfParse = require("pdf-parse");
const medicalFileRepository = require("../repository/medicalFieldRepository.js");
const transformersService = require("./pythonService.js");
const e = require("cors");

const uploadFile = async (req, decoded, res) => {
  try {
    const file = req.file;
    if (!file) return false;
    let filename = generateUniqueFilename();
    let extractedText = "";
    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(file.buffer); // ✅ use pdf-parse here
      console.log("data", data);
      extractedText = (data.text || "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n")
        .trim();
    } else {
      const data = await pdfParse(file.buffer);
      extractedText = (data.text || "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n")
        .trim();
    }
    const soapSectionMatch = extractedText.match(/HPI:\s*\n([\s\S]*)/i);

    let fileInfo = {
      medical_file_id: filename,
      user_login_id: decoded.userId,
      extracted_text:soapSectionMatch[1].trim() || extractedText,
      created_by: decoded.username ,
      modified_by: decoded.username ,
      original_text:extractedText
    };
    await medicalFileRepository.createMedicalFile(fileInfo);
    let modelPredictionInfo = await transformersService.processMedicalText(
      fileInfo,
      decoded.userId
    );
    console.log("modelPredictionInfo", modelPredictionInfo);
    if (modelPredictionInfo) {
      modelPredictionInfo.extractedText = soapSectionMatch[1].trim() || extractedText;
      return modelPredictionInfo;
    }
    else{
      res.status(200).send("failed");
    }
  } catch (error) {
    logger.error("Error in medicalFileService - uploadFile:", error);
    res.status(200).send("failed");
  }
};

module.exports = {
  uploadFile,
};
