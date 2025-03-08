const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Change to MySQL or PostgreSQL if needed
});

module.exports = sequelize;