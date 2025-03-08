const { DataTypes } = require("sequelize");
const sequelize = require("./config");

const User = sequelize.define("User", {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  phone: { type: DataTypes.STRING, unique: true, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  otp: { type: DataTypes.STRING, allowNull: true },
});

sequelize.sync(); // Sync tables

module.exports = User;
