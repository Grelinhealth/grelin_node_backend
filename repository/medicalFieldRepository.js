const logger = require("../config/loggerApi")
const { db } = require("../models");

const medicalFileModel = db.medicalFilleModel;

const createMedicalFile = async (medicalFile) => {
  try {
    return await medicalFileModel.create(medicalFile);
  } catch (error) {
    console.log("Error in medicalFileRepository - createMedicalFile:", error);
    logger.error("Error in medicalFileRepository - createMedicalFile:", error);
  }
};

// Fetch existing medicalFile by id
const getMedicalFile = async (fileId) => {
  try {
    return await medicalFileModel.findOne({
      where: { medical_file_id: fileId },
    }); 
  } catch (error) {
    logger.error("Error occured in medicalFileRepository - getMedicalFile:", error);
  }
};

module.exports = {
  createMedicalFile,
  getMedicalFile,
};
