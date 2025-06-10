module.exports = (sequelize, DataTypes) => {
  const ServiceDetailsModel = sequelize.define(
    "service_details",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
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
  return ServiceDetailsModel;
};
