module.exports = (sequelize, DataTypes) => {
  const ProvidersDetailsModel = sequelize.define(
    "providers_details",
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
        full_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        npi_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        license_number: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        board_certifications: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        affiliated_facility: {
            type: DataTypes.STRING(150),
            allowNull: true,
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
  return ProvidersDetailsModel;
};