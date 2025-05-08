const { db } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const logger = require("../config/loggerApi.js");

const orgUserModel = db.userLoginModel;


const createUser = async (userDetails) => {
  try {
    if (userDetails.password) {
      const hashedPassword = bcrypt.hashSync(userDetails.password, 10);
      const data = {
        user_name: userDetails.user_name,
        password: hashedPassword,
        role_id: userDetails.role_id,
        is_primary: userDetails.is_primary,
        user_id: userDetails.user_id,
      };
      return await orgUserModel.create(data);
    } else {
      console.log("passwords did not match");
    }
  } catch (error) {
    console.log("Error in userLoginRepository - createUser:", error);
    logger.error("Error in userLoginRepository - createUser:", error);
  }
};

const verifyUser = async (username) => {
  try {
    return await orgUserModel.findOne({ where: { user_name: username } });
  } catch (error) {
    console.log("Error in userLoginRepository - verifyUser:", error);
    logger.error("Error in userLoginRepository - verifyUser:", error);
  }
};








module.exports = {
  createUser,
  verifyUser,
};
