import { RequestHandler, Request } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { Session, SessionData } from "express-session";
import { genToken, decodeToken } from "../utils/jsonwebtoken";
import { UploadedFile } from "express-fileupload";
import Cloudinary from "../utils/cloudinary";
import { z } from "zod";

export const createUserTable: RequestHandler = async (req, res) => {
  try {
    await User.sync({ alter: true });
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
    // const nameSchema = z
    //   .string()
    //   .min(5, { message: "Must be 5 or more characters long" });
    // nameSchema.parse(fullname);
    const isEmail = await User.findOne({ where: { email } });
    if (isEmail) {
      res.status(409).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      type UserAttribut = {
        fullname: string;
        password: string;
        email: string;
        phoneNumber: string;
      };
      const data: UserAttribut = {
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
    //console.log(user);

    let checkPassword = false;
    if (user) {
      checkPassword = bcryptjs.compareSync(password, user.dataValues.password);
      if (checkPassword) {
        const token = genToken(user.dataValues.id, "1d");
        // const decode = await decodeToken(
        //   token,
        //   process.env.JWT_SECRET as Secret
        // );
        const { id, email, fullname, verify, image } = user.dataValues;

        res
          .status(200)
          .json({ user: { token, id, email, fullname, verify, image } });
      } else {
        res.status(401).json({
          message: "invalid password",
        });
      }
      // console.log(checkPassword);
      // (req.session as CustomSessionData).user = user;
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

export const setProfileImage: RequestHandler = async (req: Request, res) => {
  try {
    const reqUser = req.user;
    const image = req.files?.image as UploadedFile;
    console.log(image);
    if (image.mimetype?.includes("image")) {
      if (reqUser?.image) {
        const publicId = reqUser?.image.split("/").pop()?.split(".")[0];
        await Cloudinary.uploader.destroy(publicId as string);
      }
      const imageObject = await Cloudinary.uploader.upload(image.tempFilePath);
      const user = await User.findOne({ where: { id: reqUser?.id } });
      //console.log(user);
      user?.set({
        image: imageObject.secure_url,
      });
      await user?.save();
      const updatedUser = await User.findOne({ where: { id: reqUser?.id } });
      res.status(200).json({ user: updatedUser?.dataValues });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

export const test: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      console.log(user);

      res.status(401).json({ message: "user not found" });
    } else {
      res.status(200).json({
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
