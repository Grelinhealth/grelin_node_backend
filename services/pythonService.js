const logger = require("../config/loggerApi.js");
const axios = require("axios");
const aiMedicalfileRepository = require("../repository/aiMedicalFielsRepository.js");

const processMedicalText = async (fileInfo, userId) => {
  try {
    let info = {
      user_id: fileInfo.medical_file_id,
      text: fileInfo.original_text,
    };
    let result = await axios.post(
      `${process.env.PYTHON_SERVICE_URL}/process`,
      info
    );

    if (result.status !== 200) {
      throw new Error("Failed to fetch: No response body");
    }

    const extractField = (pattern) => {
      const match = fileInfo.original_text.match(pattern);
      return match ? match[1].trim() : null;
    };

    console.log("result", result);

    // Extract arrays directly
    const icdFormatted = result.data.icd_prediction.labels  || [];
    const cptFormatted = result.data.cpt_prediction.labels || [];

    // Extract only the codes (before ' - ')
    const predicted_icds = icdFormatted.map((code) =>
      code.label
    );
    const predicted_cpts = cptFormatted.map((code) =>
      code.label
    );

    // Combine formatted for summary
    const summary_mr = [result.data.formatted ].join("\n");

    const obj = {
      medical_file_id: fileInfo.medical_file_id,
      user_login_id: userId,

      patient_name:
        extractField(/patient name\s*:\s*(.*?)\s*medical record number/i) ||
        extractField(/PATIENT\s*\n\s*(.*?)\n/i) ||
        null,

      mrn:
        extractField(/medical record number\s*\(\s*mrn\s*\)\s*:\s*(\d+)/i) ||
        extractField(/PRN\s*(\w+)/i) ||
        null,

      dos:
        extractField(
          /date of service\s*\(\s*dos\s*\)\s*:\s*(.*?)(?=\s*encounter id|$)/i
        ) ||
        extractField(/DATE\s*(\d{2}\/\d{2}\/\d{4})/i) ||
        null,

      encounter_id:
        extractField(/encounter id\s*:\s*(enc\s*-\s*\d+\s*-\s*\d+)/i) || null,
      visit_id:
        extractField(/visit id\s*:\s*(vis\s*-\s*\d+\s*-\s*\d+)/i) || null,

      predicted_icds,
      predicted_cpts,
      summary_mr,

      created_by: fileInfo.created_by,
      modified_by: fileInfo.created_by,
    };

    const modifiedObj = {
      ...obj,
      predicted_icds: JSON.stringify(obj.predicted_icds),
      predicted_cpts: JSON.stringify(obj.predicted_cpts),
    };
    console.log("Modified obj:", modifiedObj);

    await aiMedicalfileRepository.createMedicalFile(modifiedObj);
    return modifiedObj;
  } catch (err) {
    logger.error("Error in pythonService -processMedicalText:", err);
    throw err;
  }
};

module.exports = { processMedicalText };
