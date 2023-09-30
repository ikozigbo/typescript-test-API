"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.setProfileImage = exports.deleteUser = exports.login = exports.newUser = exports.createUserTable = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createUserTable = async (req, res) => {
    try {
        await user_model_1.default.sync({ alter: true });
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
const newUser = async (req, res) => {
    try {
        const { fullname, password, email, phoneNumber } = req.body;
        const isEmail = await user_model_1.default.findOne({ where: { email } });
        if (isEmail) {
            res.status(409).json({
                message: "email already registerd",
            });
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            const data = {
                fullname,
                email,
                password: hash,
                phoneNumber,
            };
            const user = await user_model_1.default.create(data);
            res.status(201).json({
                user,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.newUser = newUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ where: { email } });
        //console.log(user);
        let checkPassword = false;
        if (user) {
            checkPassword = bcryptjs_1.default.compareSync(password, user.dataValues.password);
            if (checkPassword) {
                const token = (0, jsonwebtoken_1.genToken)(user.dataValues.id, "1d");
                // const decode = await decodeToken(
                //   token,
                //   process.env.JWT_SECRET as Secret
                // );
                const { id, email, fullname, verify, image } = user.dataValues;
                res
                    .status(200)
                    .json({ user: { token, id, email, fullname, verify, image } });
            }
            else {
                res.status(401).json({
                    message: "invalid password",
                });
            }
            // console.log(checkPassword);
            // (req.session as CustomSessionData).user = user;
        }
        else {
            res.status(404).json({
                message: "no such user with this email",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.login = login;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteUser = await user_model_1.default.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            deleteUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.deleteUser = deleteUser;
const setProfileImage = async (req, res) => {
    try {
        const reqUser = req.user;
        const image = req.files?.image;
        console.log(image);
        if (image.mimetype?.includes("image")) {
            if (reqUser?.image) {
                const publicId = reqUser?.image.split("/").pop()?.split(".")[0];
                await cloudinary_1.default.uploader.destroy(publicId);
            }
            const imageObject = await cloudinary_1.default.uploader.upload(image.tempFilePath);
            const user = await user_model_1.default.findOne({ where: { id: reqUser?.id } });
            //console.log(user);
            user?.set({
                image: imageObject.secure_url,
            });
            await user?.save();
            const updatedUser = await user_model_1.default.findOne({ where: { id: reqUser?.id } });
            res.status(200).json({ user: updatedUser?.dataValues });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.setProfileImage = setProfileImage;
const test = (req, res) => {
    try {
        res.status(200).json({ message: "gotten to this point...." });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
};
exports.test = test;
