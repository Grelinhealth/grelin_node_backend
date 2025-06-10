
const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgContactDetailsModel = db.orgContactDetailsModel;

const createOrgContactDetails = async (orgContactDetails) => {
  try {
    return await orgContactDetailsModel.create(orgContactDetails);
  } catch (error) {
    console.log("Error in orgContactDetailsRepository - createOrgContactDetails:", error);
    logger.error("Error in orgContactDetailsRepository - createOrgContactDetails:", error);
  }
};

// Fetch existing orgContactDetails by id
const getOrgContactDetails = async (orgContactDetailsId) => {
  try {
    return await orgContactDetailsModel.findOne({
      where: { org_contact_details_id: orgContactDetailsId },
    });
  } catch (error) {
    logger.error("Error occured in orgContactDetailsRepository - getOrgContactDetails:", error);
  }
};

module.exports = {
  createOrgContactDetails,
  getOrgContactDetails,
};  