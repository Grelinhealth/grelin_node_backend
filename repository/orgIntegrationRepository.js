const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgIntegrationModel = db.orgIntegrationDetailsModel;

const createOrgIntegration = async (orgIntegration) => {
  try {
    return await orgIntegrationModel.create(orgIntegration);
  } catch (error) {
    console.log("Error in orgIntegrationRepository - createOrgIntegration:", error);
    logger.error("Error in orgIntegrationRepository - createOrgIntegration:", error);
  }
};

// Fetch existing orgIntegration by id
const getOrgIntegration = async (orgIntegrationId) => {
  try {
    return await orgIntegrationModel.findOne({
      where: { org_integration_id: orgIntegrationId },
    });
  } catch (error) {
    logger.error("Error occured in orgIntegrationRepository - getOrgIntegration:", error);
  }
};

module.exports = {
  createOrgIntegration,
  getOrgIntegration,
};