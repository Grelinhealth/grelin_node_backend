module.exports = (sequelize, DataTypes) => {
	const EntitlementModel = sequelize.define("entitlements", {
		entitlement_name: {
			type: DataTypes.STRING,
            unique:true,
			allowNull: false,
		},
		entitlement_code: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
        description: {
			type: DataTypes.STRING,

		},
		is_active:{
			type:DataTypes.BOOLEAN,
            allowNull:false
		}
	});
	return EntitlementModel;
};