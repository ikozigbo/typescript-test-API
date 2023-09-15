import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQLDB!,
  process.env.MYSQLUSER!,
  process.env.MYSQLPASS!,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
  }
);

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

export default sequelize;
