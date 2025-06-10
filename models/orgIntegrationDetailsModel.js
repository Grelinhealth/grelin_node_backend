module.exports = (sequelize, DataTypes) => {
  const OrgIntegrationDetailsModel = sequelize.define(
    "org_integration_details",
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
        ehr_system: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        practice_management_software: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        preferred_integration_method: {
            type: DataTypes.STRING(50),
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
  return OrgIntegrationDetailsModel;
};