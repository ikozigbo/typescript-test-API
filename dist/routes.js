"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("./routers/user.router"));
function routes(app) {
    app.get("/", (req, res) => {
        return res.send("hello world");
    });
    app.use("/api", user_router_1.default);
}
exports.default = routes;
