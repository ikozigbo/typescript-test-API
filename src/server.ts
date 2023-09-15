import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./dbconfig/dbconfig";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
