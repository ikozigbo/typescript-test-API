"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
// auth middleware
const userAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const hasAuthorization = req.headers.authorization;
            const token = hasAuthorization.split(" ")[1];
            const user = await (0, jsonwebtoken_1.decodeToken)(token, process.env.JWT_SECRET);
            // console.log(user);
            req.user = user;
            if (req.user) {
                console.log(req.user);
                next();
            }
            else {
                res.status(400).json({ message: "please login" });
            }
        }
        else {
            res.status(400).json({
                message: "No authorization found, please login",
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.userAuth = userAuth;
// const isAdmin: RequestHandler = async (req: Request, res, next) => {
//   try {
//     if (req.user?.isAdmin) {
//       next();
//     } else {
//       res.status(401).json({ message: "not an admin" });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
