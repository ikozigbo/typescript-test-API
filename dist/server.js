"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("./dbconfig/dbconfig"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    return res.send("hello world");
});
dbconfig_1.default
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
