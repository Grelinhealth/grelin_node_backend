/**
 * Interacts with database using sequelize in-built functions.
 * return the result(obtained from database) to the corresponding invoked function in services directory.
 */

const logger = require("../config/loggerApi.js");
const { db } = require("../models");

const entitlementRoleMapModel = db.entitlementRoleMapModel;

// Fetch existing service provider by id
const getEntitlementRole = async (roleId) => {
  try {
    return await entitlementRoleMapModel.findOne({
      where: { role_Id: roleId },
    });
  } catch (error) {
    logger.error("Error occure in getServiceProvider DataAccessLayer:", error);
  }
};

// Fetch all service providers
const getAllEntitlementRole = async () => {
  try {
    return await entitlementRoleMapModel.findAll();
  } catch (error) {
    logger.error(
      "Error occure in getAllServiceProvider DataAccessLayer:",
      error
    );
  }
};

// Delete existing service provider by id
const deleteEntitlementRole = async (id) => {
  try {
    return await entitlementRoleMapModel.destroy({ where: { id } });
  } catch (error) {
    logger.error(
      "Error occure in deleteServiceProvider DataAccessLayer:",
      error
    );
  }
};

module.exports = {
  getEntitlementRole,
  getAllEntitlementRole,
  deleteEntitlementRole,
};
