/**
 * Establishes the connection between our mysql database and sequelize.
 * Synchronises the database with our model by invoking the necessary model.
 * Establishes the Associations among tables.
 */

const dbConfig = require("../config/config.js");
const logger = require("../config/loggerApi.js");

const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./userModel");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to true in production with proper CA
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    // console.log("connected to database..");
    logger.info("Data base connection sucessfull");
  })
  .catch((err) => {
    // console.log("Error" + err);
    logger.error("Data base connection error:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userLoginModel = require("./userLoginModel.js")(sequelize, DataTypes);
db.userModel = require("./userModel")(sequelize, DataTypes);
db.rolesModel = require("./rolesModel.js")(sequelize, DataTypes);
db.userRolesMapModel = require("./userRolesMapModel.js")(sequelize, DataTypes);
db.entitlementModel = require("./entitlementModel.js")(sequelize, DataTypes);
db.entitlementRoleMapModel = require("./entitlementRoleMapModel.js")(
  sequelize,
  DataTypes
);

db.medicalFilleModel = require("./medicalFileModel.js")(sequelize, DataTypes);
db.aiModifiedMedicalFileModel = require("./aiModifiedMedicalFileModel.js")(
  sequelize,
  DataTypes
);

db.sequelize
  .sync()
  // .sync({ force: true })
  // .sync({ alter: true })
  .then(() => {
    // console.log("yes re-sync done!");
    logger.info("re-sync done Sucessfully.");
  })
  .catch((err) => {
    logger.error("re-sync:", err);
  });

db.userModel.hasMany(db.userLoginModel, { foreignKey: "user_id" });
db.userLoginModel.belongsTo(db.userModel, { foreignKey: "user_id" });

// ------ user login and role id relation ship ------//
db.rolesModel.hasOne(db.userLoginModel, {
  foreignKey: "role_id",
  constraints: true,
  scope: {
    entity_name: "users",
  },
});
db.userLoginModel.belongsTo(db.rolesModel, {
  foreignKey: "role_id",
  constraints: true,
});

// ------ user rolr mappin table relationship------//
db.rolesModel.hasMany(db.userRolesMapModel, {
  foreignKey: "role_id",
  constraints: true,
});
db.userRolesMapModel.belongsTo(db.rolesModel, {
  foreignKey: "role_id",
  constraints: true,
});

db.userLoginModel.hasMany(db.userRolesMapModel, {
  foreignKey: "user_login_id",
  constraints: true,
});
db.userRolesMapModel.belongsTo(db.userLoginModel, {
  foreignKey: "user_login_id",
  constraints: true,
});

db.entitlementModel.hasMany(db.entitlementRoleMapModel, {
  foreignKey: "entitlement_id",
  constraints: true,
});
db.entitlementRoleMapModel.belongsTo(db.entitlementModel, {
  foreignKey: "entitlement_id",
  constraints: true,
});

db.rolesModel.hasMany(db.entitlementRoleMapModel, {
  foreignKey: "role_id",
  constraints: true,
});
db.entitlementRoleMapModel.belongsTo(db.rolesModel, {
  foreignKey: "role_id",
  constraints: true,
});

db.userLoginModel.hasMany(db.medicalFilleModel, {
  foreignKey: "user_login_id",
  constraints: true,
});
db.medicalFilleModel.belongsTo(db.userLoginModel, {
  foreignKey: "user_login_id",
  constraints: true,
});

db.userLoginModel.hasMany(db.aiModifiedMedicalFileModel, {
  foreignKey: "user_login_id",
  constraints: true,
});
db.aiModifiedMedicalFileModel.belongsTo(db.userLoginModel, {
  foreignKey: "user_login_id",
  constraints: true,
});


module.exports = { db, sequelize };
