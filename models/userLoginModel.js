module.exports = (sequelize, DataTypes) => {
  const UserLoginModel = sequelize.define("user_login_details", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
    },
  });

  return UserLoginModel;
};
