module.exports = (sequelize, DataTypes) => {
  const OrgSignaturesModalModel = sequelize.define(
    "org_signatures",
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
      signed_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      signature_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      signature_url: {
        type: DataTypes.BLOB('long'),
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
  return OrgSignaturesModalModel;
};
