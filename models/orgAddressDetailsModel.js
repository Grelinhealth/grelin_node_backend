module.exports = (sequelize, DataTypes) => {
  const OrgAddressDetailsModel = sequelize.define(
    "org_address_details",
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
        street_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },        
        zip_code: {
            type: DataTypes.STRING(20),
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
  return OrgAddressDetailsModel;
};