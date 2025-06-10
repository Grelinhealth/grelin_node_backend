module.exports = (sequelize, DataTypes) => {
  const PayerContractDetailsModel = sequelize.define(
    "payer_contract_details",
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
        major_payer_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        top_five_payer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        has_capitated_arrangements: {
            type: DataTypes.BOOLEAN,
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
  return PayerContractDetailsModel;
};