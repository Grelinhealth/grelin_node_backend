module.exports = (sequelize, DataTypes) => {
  const OrgContactDetailsModel = sequelize.define(
    "org_contact_details",
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
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferred_method: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
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
  return OrgContactDetailsModel;
};