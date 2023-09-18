import { RequestHandler } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUserTable: RequestHandler = async (req, res) => {
  try {
    await User.sync();
    res.status(200).json({
      message: "success",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    });
  }
};

export const newUser: RequestHandler = (req, res) => {
  try {
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    });
  }
};
