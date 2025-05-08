const { db } = require("../models");
const logger = require("../config/loggerApi.js");

const userModel = db.userModel;
const userLoginModel = db.userLoginModel;

const createUser = async (userDetails) => {
  try {
    return await userModel.create(userDetails);
  } catch (error) {
    console.log("Error in userCreationRepository - createUser:", error);
    logger.error("Error in userCreationRepository - createUser:", error);
  }
};

// Fetch existing users by id
const getUser = async (id) => {
  try {
    return await userModel.findByPk(id);
  } catch (error) {
    logger.error("Error occured in getUserRepository:", error);
  }
};

// Fetch all user
const getAllUsers = async () => {
  try {
    return await userModel.findAll({
      include: [
        {
          model: userLoginModel,
          attributes: ["user_name"],
        },
      ],
    });
  } catch (error) {
    logger.error("Error occured in getAllUsersRepository:", error);
  }
};

//update existing user by id
const updateUser = async (id, user) => {
  try {
    const result = await userModel.update(user, {
      where: { id },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    logger.error("Error occured in updateUserRepository:", error);
  }
};

// Delete existing user by id
const deleteUser = async (id) => {
  try {
    return await userModel.destroy({ where: { id } });
  } catch (error) {
    logger.error("Error occured in deleteUserRepository:", error);
  }
};

const getTotalUsersCount = async () => {
  try {
    return await userModel.count({
      col: "id",
    });
  } catch (error) {
    console.log("Error in userCreationRepository - getTotalUsersCount:", error);
    logger.error(
      "Error in userCreationRepository - getTotalUsersCount:",
      error
    );
  }
};

logger.silly("Exit UserRepository.js");

module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
  getTotalUsersCount,
};
