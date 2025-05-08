module.exports = (sequelize, DataTypes) => {
  const UserRolesMapModel = sequelize.define("user_role_mapping", {
    user_login_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return UserRolesMapModel;
};
