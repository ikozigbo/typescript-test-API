import { RequestHandler, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user.model";
import { decodeToken } from "../utils/jsonwebtoken";
import { UserAttribute } from "../interfaces/user.interface";

interface reqUser {
  user: UserAttribute;
}

type reqBody = reqUser & Request;

// auth middleware
const userAuth: RequestHandler = async (req: reqBody, res, next) => {
  try {
    if (req.headers.authorization) {
      const hasAuthorization = req.headers.authorization;
      const token = hasAuthorization.split(" ")[1];

      const user = await decodeToken(token, process.env.JWT_SECRET as Secret);
      req.user = user;
      if (req.user?.isloggedin) {
        next();
      } else {
        res.status(401).json({
          message: "please login",
        });
      }
    } else {
      res.status(400).json({
        message: "No authorization found, please login",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userAuth, isAdmin };
