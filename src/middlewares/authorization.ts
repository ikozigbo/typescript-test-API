import { RequestHandler, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user.model";
import { decodeToken } from "../utils/jsonwebtoken";
import { UserAttribute } from "../interfaces/user.interface";

declare module "express" {
  interface Request {
    user?: UserAttribute | null; // Extend the Request object with the user property
  }
}

// auth middleware
export const userAuth: RequestHandler = async (req: Request, res, next) => {
  try {
    if (req.headers.authorization) {
      const hasAuthorization = req.headers.authorization;
      const token = hasAuthorization.split(" ")[1];
      const user: UserAttribute | null = await decodeToken(
        token,
        process.env.JWT_SECRET as Secret
      );
      // console.log(user);

      req.user = user;
      if (req.user) {
        console.log(req.user);
        next();
      } else {
        res.status(400).json({ message: "please login" });
      }
    } else {
      res.status(400).json({
        message: "No authorization found, please login",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin: RequestHandler = async (req: Request, res, next) => {
  try {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "access denied, not an admin" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
