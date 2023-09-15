import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./dbconfig/dbconfig";
import logger from "./dbconfig/utils/logger";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("database connected..");
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
  });
