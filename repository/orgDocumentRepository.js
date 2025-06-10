const logger = require("../config/loggerApi");
const { db } = require("../models");

const orgDocumentModel = db.OrganizationDocumentModal;

const createOrgDocument = async (orgDocument) => {
  try {
    return await orgDocumentModel.create(orgDocument);
  } catch (error) {
    console.log("Error in orgDocumentRepository - createOrgDocument:", error);
    logger.error("Error in orgDocumentRepository - createOrgDocument:", error);
  }
};

// Fetch existing orgDocument by id
const getOrgDocument = async (orgDocumentId) => {
  try {
    return await orgDocumentModel.findOne({
      where: { org_document_id: orgDocumentId },
    });
  } catch (error) {
    logger.error("Error occured in orgDocumentRepository - getOrgDocument:", error);
  }
};

module.exports = {
  createOrgDocument,
  getOrgDocument,
};