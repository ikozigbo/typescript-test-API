"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = __importDefault(require("../routes"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, express_fileupload_1.default)({
        useTempFiles: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true,
    }));
    (0, routes_1.default)(app);
    return app;
}
exports.default = createServer;
