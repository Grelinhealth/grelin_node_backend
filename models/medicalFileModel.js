module.exports = (sequelize, DataTypes) => {
	const MedicalFilleModel = sequelize.define("medical_files", {
		medical_file_id: {
			type: DataTypes.STRING,
            unique:true,
			allowNull: false,
		},
		user_login_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        extracted_text: {
			type: DataTypes.TEXT,
            allowNull:false
		},
		is_active:{
			type:DataTypes.BOOLEAN,
            defaultValue:true
		},
        created_by: {
            type: DataTypes.STRING,
        },
        modified_by: {
            type: DataTypes.STRING,
        }
	});
	return MedicalFilleModel;
};