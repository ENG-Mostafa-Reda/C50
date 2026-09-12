const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "assignment5",
  "root",
  "1382006Mr",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;