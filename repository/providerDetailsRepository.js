const logger = require("../config/loggerApi");
const { db } = require("../models");

const providerDetailsModel = db.providersDetailsModel;

const createProviderDetails = async (providerDetails) => {
  try {
    return await providerDetailsModel.create(providerDetails);
  } catch (error) {
    console.log("Error in providerDetailsRepository - createProviderDetails:", error);
    logger.error("Error in providerDetailsRepository - createProviderDetails:", error);
  }
};

const bulkCreateProviderDetails = async (providerDetails) => {
  try {
    return await providerDetailsModel.bulkCreate(providerDetails);
  } catch (error) {
    console.log("Error in providerDetailsRepository - createProviderDetails:", error);
    logger.error("Error in providerDetailsRepository - createProviderDetails:", error);
  }
};


// Fetch existing providerDetails by id
const getProviderDetails = async (providerDetailsId) => {
  try {
    return await providerDetailsModel.findOne({
      where: { provider_details_id: providerDetailsId },
    });
  } catch (error) {
    logger.error("Error occured in providerDetailsRepository - getProviderDetails:", error);
  }
};

module.exports = {
  createProviderDetails,
  getProviderDetails,
  bulkCreateProviderDetails
};