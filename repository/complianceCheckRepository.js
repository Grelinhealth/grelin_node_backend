const logger = require("../config/loggerApi");
const { db } = require("../models");

const complianceCheckModel = db.complianceCheckModel;

const createComplianceCheck = async (complianceCheck) => {
  try {
    return await complianceCheckModel.create(complianceCheck);
  } catch (error) {
    console.log("Error in complianceCheckRepository - createComplianceCheck:", error);
    logger.error("Error in complianceCheckRepository - createComplianceCheck:", error);
  }
};

// Fetch existing complianceCheck by id
const getComplianceCheck = async (complianceCheckId) => {
  try {
    return await complianceCheckModel.findOne({
      where: { compliance_check_id: complianceCheckId },
    });
  } catch (error) {
    logger.error("Error occured in complianceCheckRepository - getComplianceCheck:", error);
  }
};

module.exports = {
  createComplianceCheck,
  getComplianceCheck,
};