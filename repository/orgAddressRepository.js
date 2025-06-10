const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgAddressModel = db.orgAddressDetailsModel;

const createOrgAddress = async (orgAddress) => {
  try {
    return await orgAddressModel.create(orgAddress);
  } catch (error) {
    console.log("Error in orgAddressRepository - createOrgAddress:", error);
    logger.error("Error in orgAddressRepository - createOrgAddress:", error);
  }
};

// Fetch existing orgAddress by id
const getOrgAddress = async (orgAddressId) => {
  try {
    return await orgAddressModel.findOne({
      where: { org_address_id: orgAddressId },
    });
  } catch (error) {
    logger.error("Error occured in orgAddressRepository - getOrgAddress:", error);
  }
};

module.exports = {
  createOrgAddress,
  getOrgAddress,
};