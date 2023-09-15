"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("./dbconfig/dbconfig"));
const logger_1 = __importDefault(require("./dbconfig/utils/logger"));
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
app.get("/", (req, res) => {
    return res.send("hello world");
});
dbconfig_1.default
    .authenticate()
    .then(() => {
    logger_1.default.info("database connected...");
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
