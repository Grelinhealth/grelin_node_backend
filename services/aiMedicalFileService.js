const logger = require("../config/loggerApi.js");
const aiMedicalfileRepository = require("../repository/aiMedicalFielsRepository.js");

const updateMedicalFile = async (req, decoded, res) => {
  try {
    let info = {
      medical_file_id: req.body.fileId,
      predicted_icds: JSON.stringify(req.body.modifiedIcds),
      predicted_cpts: JSON.stringify(req.body.modifiedCpts),
      status: req.body.status,
      modified_by: decoded.username,
    };
    const result = await aiMedicalfileRepository.updateMedicalFile(info);
    if (result) {
      return { message: "Successfully updated" };
    }
  } catch (err) {
    logger.error("Error in aiMedicalFileService - getAllMedicalFiles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMedicalFileCount = async (req, decoded, res) => {
  try {
    let startDate = req.query.start;
    let endDate = req.query.end;
    const result = await aiMedicalfileRepository.getMedicalFileCount(startDate,endDate);
    if (result) {
      return result;
    }
  } catch (err) {
    logger.error("Error in aiMedicalFileService - getAllMedicalFiles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateMedicalFile, getMedicalFileCount };
