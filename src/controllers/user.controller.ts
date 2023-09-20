import { RequestHandler } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Session, SessionData } from "express-session";

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

export const newUser: RequestHandler = async (req, res) => {
  try {
    const { fullname, password, email, phoneNumber } = req.body;
    const isEmail = await User.findOne({ where: { email } });
    if (isEmail) {
      res.status(409).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      type UserAttribute = {
        fullname: string;
        password: string;
        email: string;
        phoneNumber: string;
      };
      const data: UserAttribute = {
        fullname,
        email,
        password: hash,
        phoneNumber,
      };

      const user = await User.create(data);
      res.status(201).json({
        user,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    });
  }
};

interface CustomSessionData extends SessionData {
  user?: User;
}

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log(user);

    let checkPassword = false;
    if (user) {
      checkPassword = bcryptjs.compareSync(password, user.dataValues.password);
      // console.log(checkPassword);
      (req.session as CustomSessionData).user = user;
      res.status(200).json({ message: user?.dataValues });
    } else {
      res.status(404).json({
        message: "no such user with this email",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteUser = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      deleteUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    });
  }
};
