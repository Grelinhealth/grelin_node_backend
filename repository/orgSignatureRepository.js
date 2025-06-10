const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgSignatureModel = db.orgSignaturesModal;

const createOrgSignature = async (orgSignature) => {
  try {
    return await orgSignatureModel.create(orgSignature);
  } catch (error) {
    console.log("Error in orgSignatureRepository - createOrgSignature:", error);
    logger.error("Error in orgSignatureRepository - createOrgSignature:", error);
  }
};

// Fetch existing orgSignature by id
const getOrgSignature = async (orgSignatureId) => {
  try {
    return await orgSignatureModel.findOne({
      where: { org_signature_id: orgSignatureId },
    });
  } catch (error) {
    logger.error("Error occured in orgSignatureRepository - getOrgSignature:", error);
  }
};

module.exports = {
  createOrgSignature,
  getOrgSignature,
};      