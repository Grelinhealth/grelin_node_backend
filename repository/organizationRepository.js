const logger = require("../config/loggerApi");
const { db } = require("../models");

const organizationModel = db.organizationDetailsModel;

const createOrganization = async (organization) => {
  try {
    return await organizationModel.create(organization);
  } catch (error) {
    console.log("Error in organizationRepository - createOrganization:", error);
    logger.error("Error in organizationRepository - createOrganization:", error);
  }
};

// Fetch existing organization by id
const getOrganization = async (orgId) => {
  try {
    return await organizationModel.findOne({
      where: { org_id: orgId },
    });
  } catch (error) {
    logger.error("Error occured in organizationRepository - getOrganization:", error);
  }
};

module.exports = {
  createOrganization,
  getOrganization,
};