module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return UserModel;
};
