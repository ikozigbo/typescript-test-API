"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const genToken = (id, time) => {
    const token = jsonwebtoken_1.default.sign({
        userID: id,
    }, process.env.JWT_SECRET, {
        expiresIn: time,
    });
    return token;
};
exports.genToken = genToken;
const decodeToken = async (token, jwtSecret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, jwtSecret, async (err, data) => {
            if (err) {
                resolve(null);
            }
            else {
                try {
                    const payload = data;
                    const user = await user_model_1.default.findOne({ where: { id: payload.userID } });
                    if (user) {
                        // Access the UserAttributes from user.dataValues
                        const userAttributes = user.dataValues;
                        resolve(userAttributes);
                    }
                    else {
                        resolve(null); // User not found
                    }
                }
                catch (error) {
                    reject(error);
                }
            }
        });
    });
};
exports.decodeToken = decodeToken;
