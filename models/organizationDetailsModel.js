module.exports = (sequelize, DataTypes) => {
  const OrganizationDetailsModel = sequelize.define(
    "organization_details",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        facility_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        facility_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tax_id_ein: {
            type: DataTypes.STRING(20),
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
        license_state: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        fax_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        website_url: {
            type: DataTypes.STRING,
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
  return OrganizationDetailsModel;
};
