/**
 * Interacts with database using sequelize in-built functions.
 * return the result(obtained from database) to the corresponding invoked function in services directory.
 */

const logger = require("../config/loggerApi.js");
const { db } = require("../models");
const { Op } = require("sequelize");

const UserRoleMapModel = db.userRolesMapModel;
const rolesModel = db.rolesModel;

// Create new service provider
const createUserRoleMap = async (data) => {
  try {
    let data1 = UserRoleMapModel.create(data);
    console.log(data1);
    return data1;
  } catch (error) {
    console.log(error);
    logger.error("Error occur in creatUserRoleMap DataAccessLayer:", error);
  }
};

// Fetch existing service provider by id
const getUserRoleMap = async (userId, roleId) => {
  try {
    let roleIds = await UserRoleMapModel.findOne({
      where: { user_id: userId, role_id: roleId },
    });
    console.log(roleIds);
    return roleIds;
  } catch (error) {
    logger.error("Error occure in getUserRoleMap DataAccessLayer:", error);
  }
};

// Fetch all service providers
const getAllUserRoleMap = async (userId, primaryId) => {
  try {
    let roleIds = await UserRoleMapModel.findAll({
      where: {
        user_id: userId,
        role_id: { [Op.ne]: primaryId },
        is_active: true,
      },
      attributes: ["role_id"],
      include: [
        {
          model: rolesModel,
          attributes: ["role_name"],
        },
      ],
    });
    console.log(roleIds);
    return roleIds;
  } catch (error) {
    logger.error("Error occure in getServiceProvider DataAccessLayer:", error);
  }
};

//update existing service provider by id
const updateUserRoleMap = async (id, data) => {
  try {
    const result = await UserRoleMapModel.update(data, {
      where: { user_id: id, role_id: data.role_id },
      returning: true,
    });
    return "Success";
  } catch (error) {
    logger.error("Error occure in updateUserRoleMap DataAccessLayer:", error);
  }
};

//update existing service provider by id
const updatestatusFalse = async (id, data) => {
  try {
    const info = {
      is_active: data,
    };
    const result = await UserRoleMapModel.update(info, {
      where: { user_id: id },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    logger.error("Error occure in updatestatusFalse DataAccessLayer:", error);
  }
};

// Delete existing service provider by id
const deleteUserRoleMap = async (id) => {
  try {
    return await UserRoleMapModel.destroy({ where: { id } });
  } catch (error) {
    logger.error("Error occure in deleteUserRoleMap DataAccessLayer:", error);
  }
};

module.exports = {
  createUserRoleMap,
  getUserRoleMap,
  getAllUserRoleMap,
  updateUserRoleMap,
  deleteUserRoleMap,
  updatestatusFalse,
};
