"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express, { Request, Response } from "express";
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("./dbconfig/dbconfig"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const logger_1 = __importDefault(require("./dbconfig/utils/logger"));
const server_utility_1 = __importDefault(require("./utils/server.utility"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, server_utility_1.default)();
dbconfig_1.default
    .authenticate()
    .then(() => {
    logger_1.default.info("Database connected.......");
})
    .then(() => {
    app.listen(PORT, () => {
        logger_1.default.info(`Listening to port: ${PORT}`);
    });
})
    .catch((error) => {
    logger_1.default.error(error.message);
});
process.on("SIGINT", async () => {
    await dbconfig_1.default.close();
    logger_1.default.info("Server closed");
    process.exit(0);
});
// Create a MySQL connection pool
// const pool: Pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
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
// const store = new MongoDBStore({
//   uri: process.env.DB as string, // Assuming DB is a string
//   collection: "my sessions",
// });
// app.use(
//   session({
//     secret: "thisWillSignTheCookie",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     store: store,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 3600000, // Session expiration time in milliseconds (e.g., 1 hour)
//     },
//   })
// );
