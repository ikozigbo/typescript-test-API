"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.createUserTable = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserTable = async (req, res) => {
    try {
        await user_model_1.default.sync();
        res.status(200).json({
            message: "success",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.createUserTable = createUserTable;
const newUser = (req, res) => {
    try {
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.newUser = newUser;
