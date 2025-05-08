/**
 * config details of mysql dtatabase.
 */
module.exports = {
  HOST: process.env.AZURE_MYSQL_HOST,
  USER: process.env.AZURE_MYSQL_USER,
  PASSWORD: process.env.AZURE_MYSQL_PASSWORD,
  DB: process.env.AZURE_MYSQL_DATABASE,
  port: process.env.AZURE_MYSQL_PORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
