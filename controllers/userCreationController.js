const userCreationService = require("../services/userCreationService");
const logger = require("../config/loggerApi.js");
const emailAlertsService = require("../services/emailAlertsService");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userCreationService.createUser(req.body);
    // if (user) {
    //   const createUser = emailAlertsService.emailUsers(req.body);
    //   res.status(200).send(user);
    // }
  } catch (error) {
    console.log("Error in userCreationController - createUser:", error);
    logger.error("Error in userCreationController - createUser:", error);
  }
};

// To update existing User by id
const updateuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await userCreationService.updateUser(id, req.body);
    logger.debug(
      "Http request recieved to updateUserController and it is redirected to updateUserSevice"
    );

    res.status(200).json("success");
  } catch (error) {
    next(error);
    logger.error("Error occure in updateUser controller:", error);
  }
};

// To delete existing User by id
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userCreationService.deleteUser(id);
    logger.debug(
      "Http request recieved to deleteUserController and it is redirected to deleteUserSevice"
    );
    res.status(204).end();
  } catch (error) {
    next(error);
    logger.error("Error occured in deleteUserontroller:", error);
  }
};

// To fetch User by id
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userCreationService.getUser(id);
    logger.debug(
      "Http request recieved to getUSerController and it is redirected to getUSerSevice"
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
    logger.error("Error occured in getUsercontroller:", error);
  }
};

// To fetch all User
const getAllUser = async (req, res, next) => {
  try {
    const users = await userCreationService.getAllUser();
    logger.debug(
      "Http request recieved to getAllUserController and it is redirected to getAllUserSevice"
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
    logger.error("Error occured in getAllUserProviders controller:", error);
  }
};

module.exports = {
  createUser,
  updateuser,
  getUser,
  getAllUser,
  deleteUser,
};
