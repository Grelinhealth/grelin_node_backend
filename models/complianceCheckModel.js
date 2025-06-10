module.exports = (sequelize, DataTypes) => {
  const ComplianceCheckModel = sequelize.define(
    "compliance_check",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        org_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hipaa_confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        data_access_authorized: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        terms_accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modified_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: "created_date",
        updatedAt: "modified_date",
    }
  );
  return ComplianceCheckModel;
};