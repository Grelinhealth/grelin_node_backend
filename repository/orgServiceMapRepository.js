const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgServiceMapModel = db.orgServiceMappingModel;

const createOrgServiceMap = async (orgServiceMap) => {
  try {
    return await orgServiceMapModel.create(orgServiceMap);
  } catch (error) {
    console.log("Error in orgServiceMapRepository - createOrgServiceMap:", error);
    logger.error("Error in orgServiceMapRepository - createOrgServiceMap:", error);
  }
};


const bulkCreateOrgServiceMap = async (orgServiceMap) => {
  try {
    return await orgServiceMapModel.bulkCreate(orgServiceMap);
  } catch (error) {
    console.log("Error in orgServiceMapRepository - createOrgServiceMap:", error);
    logger.error("Error in orgServiceMapRepository - createOrgServiceMap:", error);
  }
};

// Fetch existing orgServiceMap by id
const getOrgServiceMap = async (orgServiceMapId) => {
  try {
    return await orgServiceMapModel.findOne({
      where: { org_service_map_id: orgServiceMapId },
    });
  } catch (error) {
    logger.error("Error occured in orgServiceMapRepository - getOrgServiceMap:", error);
  }
};

module.exports = {
  createOrgServiceMap,
  getOrgServiceMap,
  bulkCreateOrgServiceMap
};  