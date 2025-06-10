const express = require("express");
const { authJwt } = require("../../middleware");
const router = express.Router();
const providerController = require("../../controllers/providerController");

router.post("/onboarding", providerController.providerOnboarding);


module.exports = router;