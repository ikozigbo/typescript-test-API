import sequelize from "../config/dbconnect";
import express from "express";
import fileUpload from "express-fileupload";
import routes from "../routes";

function createServer() {
  const app = express();
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
  routes(app);
  return app;
}

export default createServer;
