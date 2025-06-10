module.exports = (sequelize, DataTypes) => {
  const OrganizationDocumentModalModel = sequelize.define(
    "org_documents",
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
        document_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        document_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        document_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploaded_date: {
            type: DataTypes.DATE,
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
  return OrganizationDocumentModalModel;
};