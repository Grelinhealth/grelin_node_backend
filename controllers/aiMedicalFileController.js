const logger = require("../config/loggerApi.js");
const jwtDecodeService = require("../services/jwtDecodeService");
const aiMedicalFileService = require("../services/aiMedicalFileService");

const updateMedicalFile = async (req, res) => {
  try {
    logger.info("Enter in aiMedicalFileController - updatemedicalFile");
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7); // removes "Bearer " (including the space)
    }
    let decodeValue = await jwtDecodeService.deocdeJwtToken(token);
    const result = await aiMedicalFileService.updateMedicalFile(req, decodeValue, res);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error in aiMedicalFileController - updatemedicalFile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMedicalFileCount = async (req, res) => {
  try {
    logger.info("Enter in aiMedicalFileController - getMedicalFileCount");
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7); // removes "Bearer " (including the space)
    }
    let decodeValue = await jwtDecodeService.deocdeJwtToken(token);
    const result = await aiMedicalFileService.getMedicalFileCount(req, decodeValue, res);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error in aiMedicalFileController - getMedicalFileCount:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    updateMedicalFile,
    getMedicalFileCount
};