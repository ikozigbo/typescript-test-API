"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("./dbconfig/dbconfig"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const promise_1 = __importDefault(require("mysql2/promise"));
const logger_1 = __importDefault(require("./dbconfig/utils/logger"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// Create a MySQL connection pool
const pool = promise_1.default.createPool({
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
    uri: process.env.DB,
    collection: "my sessions",
});
app.use((0, express_session_1.default)({
    secret: "thisWillSignTheCookie",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // Session expiration time in milliseconds (e.g., 1 hour)
    },
}));
app.get("/", (req, res) => {
    return res.send("hello world");
});
app.use("/api", user_router_1.default);
dbconfig_1.default
    .authenticate()
    .then(() => {
    logger_1.default.info("Database connected...");
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
