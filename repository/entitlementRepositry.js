/**
 * Interacts with database using sequelize in-built functions.
 * return the result(obtained from database) to the corresponding invoked function in services directory.
 */

const logger = require("../config/loggerApi.js");
const { db } = require("../models");

const entitlementModel = db.entitlementModel;

// Fetch existing service provider by id
const getEntitlement = async (id) => {
  try {
    return await entitlementModel.findOne({ where: { id: id } });
  } catch (error) {
    logger.error("Error occure in getEntitlement DataAccessLayer:", error);
  }
};

// Fetch all service providers
const getAllEntitlement = async () => {
  try {
    return await entitlementModel.findAll();
  } catch (error) {
    logger.error("Error occure in getAllEntitlement DataAccessLayer:", error);
  }
};

// Delete existing service provider by id
const deleteEntitlement = async (id) => {
  try {
    return await entitlementModel.destroy({ where: { id } });
  } catch (error) {
    logger.error("Error occure in deleteEntitlement DataAccessLayer:", error);
  }
};

module.exports = {
  getEntitlement,
  getAllEntitlement,
  deleteEntitlement,
};
