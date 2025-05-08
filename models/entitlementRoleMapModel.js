module.exports = (sequelize, DataTypes) => {
	const EntitlementRoleMappingModel = sequelize.define("entitlement_role_mapping", {
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        entitlement_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	return EntitlementRoleMappingModel;
};