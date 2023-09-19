import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import sequelize from "./dbconfig/dbconfig";
import session from "express-session";
import MySQLStore from "express-mysql-session"; // Use MySQLStore here, not MySQLsession
import connectMongoDBSession from "connect-mongodb-session";
import mysql, { Pool, PoolOptions } from "mysql2/promise";
import logger from "./dbconfig/utils/logger";
import userRouter from "./routers/user.router";

const MongoDBStore = connectMongoDBSession(session);

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

// Create a MySQL connection pool
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Configure express-session and MySQLStore for session storage
// const sessionStore = new MySQLStore( // Use 'new MySQLStore' to create an instance
//   {
//     createDatabaseTable: true,
//     schema: {
//       tableName: "sessions",
//       columnNames: {
//         session_id: "session_id",
//         expires: "expires",
//         data: "data",
//       },
//     },
//   },
//   pool
// );

const store = new MongoDBStore({
  uri: process.env.DB as string, // Assuming DB is a string
  collection: "my sessions",
});

app.use(
  session({
    secret: "thisWillSignTheCookie",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // Session expiration time in milliseconds (e.g., 1 hour)
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.use("/api", userRouter);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connected...");
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
