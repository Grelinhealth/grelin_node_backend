const logger = require("../config/loggerApi")
const { db } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

const aiMedicalFileModel = db.aiModifiedMedicalFileModel;

const createMedicalFile = async (medicalFile) => {
  try {
    return await aiMedicalFileModel.create(medicalFile);
  } catch (error) {
    console.log("Error in medicalFileRepository - createMedicalFile:", error);
    logger.error("Error in medicalFileRepository - createMedicalFile:", error);
  }
};

const updateMedicalFile = async (medicalFile) => {
  try {
    return await aiMedicalFileModel.update(medicalFile, {
      where: { medical_file_id: medicalFile.medical_file_id },
    });
  } catch (error) {
    logger.error("Error in medicalFileRepository - updateMedicalFile:", error);
  }
};

// Fetch existing medicalFile by id
const getMedicalFile = async (fileId) => {
  try {
    return await aiMedicalFileModel.findOne({
      where: { medical_file_id: fileId },
    }); 
  } catch (error) {
    logger.error("Error occured in medicalFileRepository - getMedicalFile:", error);
  }
};


const getMedicalFileCount = async (startDate,endDate) => {
  try {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
  
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const summary = await aiMedicalFileModel.findAll({
      attributes: [
        [fn('COUNT', col('id')), 'Total_Charts_Assigned'],
        [
          fn('SUM', literal(`CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END`)),
          'Total_Charts_Completed'
        ],
        [
          literal(`
            CASE 
              WHEN SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) > 0 THEN ROUND(
                (SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) * 100.0) /
                SUM(CASE WHEN status IN ('Pending', 'Manager Review') THEN 1 ELSE 0 END), 2
              )
              ELSE 0
            END
          `),
          'Audit_Accuracy_Percentage'
        ],
        [
          fn('SUM', literal(`CASE WHEN status IN ('Pending', 'Manager Review') THEN 1 ELSE 0 END`)),
          'Total_Charts_Pending'
        ]
      ],
      where: {
        createdAt: {
          [Op.between]: [
           start,end
          ],
        },
      },
      raw: true,
    });
    
    // 2. Get Detailed List
    const detailedList = await aiMedicalFileModel.findAll({
      attributes: [
        ['dos', 'DOS'],
        ['patient_name', 'Patient Name'],
        ['mrn', 'MRN'],
        ['status', 'Status']
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      order: [['dos', 'DESC']],
      raw: true,
    });
    
    console.log('Summary:', summary);
    console.log('Detailed List:', detailedList);
    return { summary, detailedList };
  } catch (error) {
    logger.error("Error occured in medicalFileRepository - getMedicalFileCount:", error);
  }
}

module.exports = {
  createMedicalFile,
  getMedicalFile,
  updateMedicalFile,
  getMedicalFileCount
};
