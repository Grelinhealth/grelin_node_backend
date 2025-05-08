const orgUserRepository = require("../repository/userLoginRepository");
const entitlementRepositry = require("../repository/entitlementRepositry");
const entitlementRoleMapRepositry = require("../repository/entitlementRoleMapRepositry");
const userRoleMapRepository = require("../repository/userRoleMapRepositry");
const bcrypt = require("bcrypt");

const createUser = async (orgService) => {
  return await orgUserRepository.createUser(orgService);
};

const verifyUser = async (username) => {
  try {
    user = await orgUserRepository.verifyUser(username);
    console.log(user);
    if (user !== null) {
      let entitlementRoleMap =
        await entitlementRoleMapRepositry.getEntitlementRole(user.role_id);
      let { entitlement_code } = await entitlementRepositry.getEntitlement(
        entitlementRoleMap.entitlement_id
      );

      let returnData = {
        user_login_id: user.id,
        entity_name: user.entity_name,
        entity_id: user.entity_id,
        user_name: user.user_name,
        password: user.password,
        role_id: user.role_id,
        entitlement_code: entitlement_code,
        userId:user.user_id
      };

      return returnData;
    } else {
      return false;
    }
    // }
  } catch (error) {
    console.log("Error in userLoginService - verifyUser:", error);
    logger.error("Error in userLoginService - verifyUser:", error);
  }
};



// const forgotPassword = async (username) => {
//   try {
//     const user = await await orgUserRepository.verifyUser(username);
//     if (user) {
//       let entityName = user.dataValues.entity_name;
//       let entityId = user.dataValues.entity_id;
//       let emailId;
//       if (
//         entityName === "service_providers" ||
//         entityName === "organisation" ||
//         entityName === "audit_agency"
//       ) {
//         emailId = await orgUserRepository.getEmailId(entityName, entityId);
//       } else {
//         emailId = await orgUserRepository.getUserMailId(entityName, entityId);
//       }

//       if (emailId) {
//         const otp = Math.floor(100000 + Math.random() * 900000);
//         console.log("otp", otp);
//         const createdDate = new Date();
//         let expiredDate = new Date(createdDate); // Clone the created_date
//         expiredDate.setMinutes(createdDate.getMinutes() + 15);

//         let data = {
//           user_name: username,
//           otp: otp,
//           created_date: createdDate,
//           expired_date: expiredDate,
//           is_active: true,
//           attempt: 1,
//           user_id: entityId,
//           email:
//             emailId.dataValues.email_id || emailId.dataValues.contact_detail,
//         };
//         let otpDetails = await otpDetailRepositry.createOtpDetails(data);
//         if (otpDetails) {
//           let mailAlerts = await emailAlertsService.forgotPasswordEmail(data);
//           if (mailAlerts === "Email sent") {
//             return "success";
//           } else {
//             return "failed";
//           }
//         }
//       } else {
//         return "Email not found";
//       }
//     }
//   } catch (error) {
//     console.log("error in forgotPassword", error);
//     logger.error("error in forgotPassword", error);
//   }
// };

// const updatePassword = async (username, otp) => {
//   try {
//     let user = await otpDetailRepositry.getOtpDetails(username, otp);
//     if (user) {
//       if (user.dataValues.expired_date <= new Date()) {
//         return { status: false, message: "OTP has expired." };
//       }
//       // Check if attempts are not exceeded
//       if (user.dataValues.attempt >= 3) {
//         return { status: false, message: "Maximum attempts exceeded." };
//       }
//       const randomPassword = generatePassword();
//       let info = {
//         password: bcrypt.hashSync(randomPassword, 10),
//       };

//       const res = await otpDetailRepositry.updatePassword(info, username);
//       if (res) {
//         let result = await resetMail(username, randomPassword);
//         if (result === "success") {
//           return { status: true, message: "OTP verified successfully." };
//         }
//       }
//     } else {
//       const data = await otpDetailRepositry.getOtpDetailsByUserName(username);

//       if (data) {
//         let info = {
//           attempt: data.dataValues.attempt + 1,
//         };
//         const result = await otpDetailRepositry.updateOtpDetails(
//           info,
//           data.dataValues.id
//         );
//         return { status: false, message: "Invalid OTP." };
//       }
//     }
//   } catch (error) {
//     console.log("error in forgotPassword", error);
//     logger.error("error in forgotPassword", error);
//   }
// };

// const resetMail = async (username, randomPassword) => {
//   try {
//     const user = await await orgUserRepository.verifyUser(username);
//     if (user) {
//       let entityName = user.dataValues.entity_name;
//       let entityId = user.dataValues.entity_id;
//       let emailId;
//       if (
//         entityName === "service_providers" ||
//         entityName === "organisation" ||
//         entityName === "audit_agency"
//       ) {
//         emailId = await orgUserRepository.getEmailId(entityName, entityId);
//       } else {
//         emailId = await orgUserRepository.getUserMailId(entityName, entityId);
//       }
//       if (emailId) {
//         let data = {
//           userName: username,
//           email: emailId.dataValues.contact_detail,
//           password: randomPassword,
//         };
//         let mailAlerts = await emailAlertsService.resetPasswordEmail(data);
//         if (mailAlerts === "Email sent") {
//           return "success";
//         } else {
//           return "failed";
//         }
//       }
//     }
//   } catch (error) {
//     console.log("error in resetMail", error);
//     logger.error("error in resetMail", error);
//   }
// };

// function generatePassword() {
//   const word = generateRandomWord(7); // Generate a random word of 7 characters
//   const specialChar = "@"; // Special character part
//   const digits = generateRandomDigits(3); // Random number part

//   return word + specialChar + digits;
// }

// function generateRandomWord(length) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//   return Array.from(
//     { length },
//     () => characters[Math.floor(Math.random() * characters.length)]
//   ).join("");
// }

// function generateRandomDigits(length) {
//   return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
// }

module.exports = {
  createUser,
  verifyUser,
  // veifyRoleId,
  // forgotPassword,
  // updatePassword,
  // resetMail,
};
