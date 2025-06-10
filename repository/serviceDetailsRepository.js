const logger = require("../config/loggerApi");
const { db } = require("../models");

const serviceDetailsModel = db.serviceDetailsModel;

const createServiceDetails = async (serviceDetails) => {
  try {
    return await serviceDetailsModel.create(serviceDetails);
  } catch (error) {
    console.log("Error in serviceDetailsRepository - createServiceDetails:", error);
    logger.error("Error in serviceDetailsRepository - createServiceDetails:", error);
  }
};

// Fetch existing serviceDetails by id
const getServiceDetails = async (serviceDetailsId) => {
  try {
    return await serviceDetailsModel.findOne({
      where: { service_details_id: serviceDetailsId },
    });
  } catch (error) {
    logger.error("Error occured in serviceDetailsRepository - getServiceDetails:", error);
  }
};

module.exports = {
  createServiceDetails,
  getServiceDetails,
};      