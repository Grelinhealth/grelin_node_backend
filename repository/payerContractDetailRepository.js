const logger = require("../config/loggerApi");
const { db } = require("../models");

const payerContractDetailModel = db.payerContractDetailsModel;

const createPayerContractDetail = async (payerContractDetail) => {
  try {
    return await payerContractDetailModel.create(payerContractDetail);
  } catch (error) {
    console.log("Error in payerContractDetailRepository - createPayerContractDetail:", error);
    logger.error("Error in payerContractDetailRepository - createPayerContractDetail:", error);
  }
};

// Fetch existing payerContractDetail by id
const getPayerContractDetail = async (payerContractDetailId) => {
  try {
    return await payerContractDetailModel.findOne({
      where: { payer_contract_detail_id: payerContractDetailId },
    });
  } catch (error) {
    logger.error("Error occured in payerContractDetailRepository - getPayerContractDetail:", error);
  }
};

module.exports = {
  createPayerContractDetail,
  getPayerContractDetail,
};  