
const express = require("express");
// Controller
const { authJwt, apprequestValidation } = require("../../middleware");
const loginController = require("../../controllers/userLoginController");

const router = express.Router();



router.post(
  "/",
  [apprequestValidation.loginValidation, apprequestValidation.checkRules],
  loginController.login
);

// router.post(
//   "/refreshToken",
//   [authJwt.verifyToken],
//   loginController.refreshToken
// );

router.post("/sigIn", loginController.createUser);

// router.post("/forgotPassword", loginController.forgotPassword);

// router.post("/updatePassword", loginController.updatePassword);



module.exports = router;
