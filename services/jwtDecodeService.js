const logger = require("../config/loggerApi");
const jwt = require("jsonwebtoken");

const deocdeJwtToken = async (token) => {
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedData) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      // console.log("req......", req);
      console.log("decoded......", decodedData);
      console.log("decoded.user[0]......", decodedData.user.user_name);
      console.log("decoded.id......", decodedData.user.user_login_id);
      userLoginEntityId = {
        username: decodedData.user.user_name,
        userId:  decodedData.user.user_login_id,
      };
    });
    return userLoginEntityId;
  } catch (error) {
    logger.error("Error in jwtDecodeService - deocdeJwtToken:", error);
  }
};

module.exports = { deocdeJwtToken };
