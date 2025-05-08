const logger = require("../config/loggerApi.js");
const { db } = require("../models");

const rolesModel = db.rolesModel;

// Create new role
const createrole = async (data) => {
  try {
    return rolesModel.create(data);
  } catch (error) {
    logger.error("Error occured in createrole Repositry:", error);
  }
};

// Fetch existing role by id
const getrole = async (role_name) => {
  try {
    let role = await rolesModel.findOne({ where: { role_name: role_name } });
    // console.log("rolesModel Repo-->" + role.id);
    return role.id;
  } catch (error) {
    logger.error("Error occured in getrole Repositry:", error);
  }
};

const getRoleById = async (id) => {
  try {
    return await rolesModel.findByPk(id);
  } catch (error) {
    console.log("Error in rolesRepository - getRolesById:", error);
    logger.error("Error in rolesRepository - getRolesById:", error);
  }
};

// Fetch all role
const getAllrole = async () => {
  try {
    return await rolesModel.findAll();
  } catch (error) {
    logger.error("Error occured in getAllOrole Repositry:", error);
  }
};

//update existing role by id
const updaterole = async (id, user) => {
  try {
    const result = await rolesModel.update(user, {
      where: { id },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    logger.error("Error occured in updaterole Repositry:", error);
  }
};

// Delete existing role by id
const deleterole = async (id) => {
  try {
    return await rolesModel.destroy({ where: { id } });
  } catch (error) {
    logger.error("Error occured in deleterole Repositry:", error);
  }
};

module.exports = {
  createrole,
  getrole,
  getAllrole,
  updaterole,
  deleterole,
  getRoleById,
};
