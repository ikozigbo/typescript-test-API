import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import sequelize from "./dbconfig/dbconfig";
import logger from "./dbconfig/utils/logger";
import userRouter from "./routers/user.router";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.use("/api", userRouter);

sequelize
  .authenticate()
  .then(() => {
    logger.info("database connected...");
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
  });

process.on("SIGINT", async () => {
  await sequelize.close();
  logger.info("Server closed");
  process.exit(0);
});
