module.exports = (sequelize, DataTypes) => {
  const MedicalFilleModel = sequelize.define("ai_modified_medical_files", {
    medical_file_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    user_login_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mrn: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    dos: {
      type: DataTypes.STRING,
    },
    encounter_id: {
      type: DataTypes.STRING,
    },
    visit_id: {
      type: DataTypes.STRING,
    },
    predicted_icds: {
      type: DataTypes.STRING,
    },
    predicted_cpts: {
      type: DataTypes.STRING,
    },
    summary_mr: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    created_by: {
      type: DataTypes.STRING,
    },
    modified_by: {
      type: DataTypes.STRING,
    },
  });
  return MedicalFilleModel;
};
