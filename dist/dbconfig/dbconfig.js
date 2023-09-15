"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.MYSQLDB, process.env.MYSQLUSER, process.env.MYSQLPASS, {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
});
// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
exports.default = sequelize;
