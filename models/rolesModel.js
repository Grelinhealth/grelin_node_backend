module.exports = (sequelize, DataTypes) => {
	const RolesModel = sequelize.define("roles", {
		role_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique:true,
		},
		role_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		descrpition: {
			type: DataTypes.STRING,
		},
		is_active:{
			type:DataTypes.BOOLEAN,
			allowNull:false,
		}
	});
	return RolesModel;
};