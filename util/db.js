const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("store-app", "root", process.env.DB_PASS, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
