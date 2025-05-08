const userCreationRepository = require("../repository/userCreationRepository");
const userLoginRepository = require("../repository/userLoginRepository");
const userRoleMapRepository = require("../repository/userRoleMapRepositry");
const roleRepository = require("../repository/rolesRepositry");

const logger = require("../config/loggerApi.js");
const { error } = require("winston");

const createUser = async (userDetails) => {
  if (userDetails.circle_id) {
    const userInfo = {
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      mobile_number: userDetails.mobile_number,
      email_id: userDetails.email_id,
      designation: userDetails.designation,
      role: userDetails.primaryRoles,
      circle_id: userDetails.circle_id,
    };
    console.log(userInfo);
    return await userCreationRepository
      .createUser(userInfo)
      .then(async (userLoginModel) => {
        let roleId = userDetails.primaryRoles;
        let role_id = await roleRepository.getrole(roleId);
        if (role_id) {
          const loginInfo = {
            entity_name: "users",
            entity_id: userLoginModel.id,
            user_name: userDetails.user_name,
            password: userDetails.password,
            role_id: role_id,
            is_primary: userDetails.is_primary,
          };
          return await userLoginRepository.createUser(loginInfo);
        }
      })
      .then(async (userRoleMap) => {
        const info = {
          user_id: userRoleMap.id,
          role_id: userRoleMap.role_id,
        };
        return userRoleMapRepository.createUserRoleMap(info);
      })
      .catch((error) => {
        console.log("Error in userCreationService - createUser:", error);
        logger.error("Error in userCreationService - createUser:", error);
      });
  } else {
    const userInfo = {
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      mobile_number: userDetails.mobile_number,
      email_id: userDetails.email_id,
      designation: userDetails.designation,
      role: userDetails.primaryRoles,
    };
    return await userCreationRepository
      .createUser(userInfo)
      .then(async (userLoginModel) => {
        let roleId = userDetails.primaryRoles;
        let role_id = await roleRepository.getrole(roleId);
        if (role_id) {
          const loginInfo = {
            entity_name: "users",
            entity_id: userLoginModel.id,
            user_name: userDetails.user_name,
            password: userDetails.password,
            role_id: role_id,
            is_primary: userDetails.is_primary,
          };
          return await userLoginRepository.createUser(loginInfo);
        }
      })
      .then(async (userRoleMap) => {
        const info = {
          user_id: userRoleMap.id,
          role_id: userRoleMap.role_id,
        };
        let value = userRoleMapRepository.createUserRoleMap(info);
        return value;
      })
      .catch((error) => {
        console.log("ERROR", error);
        logger.error("Error in userCreationService - createUser", error);
      });
  }
};
// Fetch existing user by id
const getUser = async (id) => {
  try {
    let userDetails = await userCreationRepository.getUser(id);
    if (userDetails.role != "CIRCLE ADMIN") {
      let roleId = userDetails.role;
      let role_id = await roleRepository.getrole(roleId);
      let modelName = "users";
      let userLoginID = await userLoginRepository.getUsername(
        role_id,
        id,
        modelName
      );
      let otherRoles = await userRoleMapRepository.getAllUserRoleMap(
        userLoginID.id,
        role_id
      );
      const transformedData = otherRoles.map((item) => ({
        value: item.role.role_name,
        label: item.role.role_name,
      }));
      console.log("userDetails...", userDetails);
      console.log("transformedData...", transformedData);
      return [userDetails, transformedData];
    } else {
      let transformedData = [];
      return [userDetails, transformedData];
    }
  } catch (error) {
    logger.error("Error occured in getUser service:", error);
  }
};

// Fetch all user
const getAllUser = async () => {
  try {
    return await userCreationRepository.getAllUsers();
  } catch (error) {
    logger.error("Error occured in getAllUsers service:", error);
  }
};

// Update existing user by id
const updateUser = async (id, user) => {
  try {
    const existingUser = await userCreationRepository.getUser(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (user.role) {
      const roleId = user.role;
      const role_id = await roleRepository.getrole(roleId);
      return await userCreationRepository
        .updateUser(id, user)
        .then(async (userLoginModel) => {
          if (role_id) {
            const loginInfo = {
              entity_name: "users",
              entity_id: id,
              user_name: user.user_name,
              password: user.password,
              role_id: role_id,
              is_primary: user.is_primary,
            };
            return await userLoginRepository.updateUser(loginInfo);
          }
        })
        .then(async (userRoleMap) => {
          let modelName = "users";
          let userLoginValue = await userLoginRepository.getUsername(
            role_id,
            id,
            modelName
          );
          console.log(userLoginValue);
          const info = {
            user_id: userLoginValue.id,
            role_id: role_id,
          };
          return userRoleMapRepository.updateUserRoleMap(info);
        })
        .catch((error) => console.log(error));
    } else {
      let roleId = user.primaryRoles;
      let role_id = await roleRepository.getrole(roleId);
      const userInfo = {
        first_name: user.first_name,
        last_name: user.last_name,
        mobile_number: user.mobile_number,
        email_id: user.email_id,
        designation: user.designation,
        role: user.primaryRoles,
      };
      console.log(userInfo);
      return await userCreationRepository
        .updateUser(id, userInfo)
        .then(async (userLoginModel) => {
          if (role_id) {
            const loginInfo = {
              entity_name: "users",
              entity_id: id,
              role_id: role_id,
              is_primary: user.is_primary,
            };
            return await userLoginRepository.updateUser(loginInfo);
          }
        })
        .then(async (userRoleMap) => {
          let modelName = "users";
          let userLoginValue = await userLoginRepository.getUsername(
            role_id,
            id,
            modelName
          );
          let loginID = userLoginValue.id;

          let isActive = false;
          await userRoleMapRepository.updatestatusFalse(loginID, isActive);
          const info = {
            user_id: loginID,
            role_id: role_id,
          };
          let value = await userRoleMapRepository.getUserRoleMap(
            loginID,
            role_id
          );
          if (value) {
            let data = {
              user_id: loginID,
              role_id: role_id,
              is_active: true,
            };
            await userRoleMapRepository.updateUserRoleMap(loginID, data);
          } else {
            let creationData = {
              user_id: loginID,
              role_id: role_id,
              is_active: true,
            };
            await userRoleMapRepository.createUserRoleMap(creationData);
          }

          if (user.otherRoles) {
            try {
              let otherRoles = user.otherRoles;
              for (let i = 0; i < otherRoles.length; i++) {
                let roleName = otherRoles[i];
                let otherRoleId = await roleRepository.getrole(roleName);
                if (otherRoleId) {
                  let value = await userRoleMapRepository.getUserRoleMap(
                    loginID,
                    otherRoleId
                  );
                  if (value) {
                    let data = {
                      user_id: loginID,
                      role_id: otherRoleId,
                      is_active: true,
                    };
                    await userRoleMapRepository.updateUserRoleMap(
                      loginID,
                      data
                    );
                  } else {
                    let creationData = {
                      user_id: loginID,
                      role_id: otherRoleId,
                      is_active: true,
                    };
                    await userRoleMapRepository.createUserRoleMap(creationData);
                  }
                }
              }
            } catch (error) {
              console.log("Error in usercreationService - roleId:", error);
              logger.error("error from user role mapping", error);
            }
          }
          return value;
        });
    }
  } catch (error) {
    console.log(error);
    logger.error("Error occured in updateUser service:", error);
  }
};

// Delete existing user by id
const deleteUser = async (id) => {
  try {
    const existingUser = await userCreationRepository.getUser(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    return await UserRepository.deleteUsers(id);
  } catch (error) {
    logger.error("Error occured in deleteUser service:", error);
  }
};

logger.silly("Exit UserService.js");

module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUser,
  deleteUser,
};
