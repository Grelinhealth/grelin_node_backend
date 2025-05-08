const express = require("express");
const { authJwt} = require("../../middleware");
const medicalFileController = require("../../controllers/medicalFileController");
const aiMedicalFileController = require("../../controllers/aiMedicalFileController");

const router = express.Router();

router.post(
    "/upload",[authJwt.verifyToken],
medicalFileController.upload.single('file'),medicalFileController.uploadFile
  );

router.post(
    "/update-file",[authJwt.verifyToken],
aiMedicalFileController.updateMedicalFile
  );

router.get(
    "/file-count",[authJwt.verifyToken],
aiMedicalFileController.getMedicalFileCount
  );

module.exports=router