import jwt, { Secret } from "jsonwebtoken";
import { UserAttribute } from "../interfaces/user.interface";
import User from "../models/user.model";

interface jwtPayload {
  userID: string;
}

export const genToken = (id: number, time: string): string => {
  const token = jwt.sign(
    {
      userID: id,
    },
    <string>process.env.JWT_SECRET,
    {
      expiresIn: time,
    }
  );
  return token;
};

export const decodeToken = async (
  token: string,
  jwtSecret: Secret
): Promise<UserAttribute | null> => {
  return new Promise<UserAttribute | null>((resolve, reject) => {
    jwt.verify(token, jwtSecret, async (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const payload = data as jwtPayload;
          const user = await User.findOne({ where: { id: payload.userID } });

          if (user) {
            // Access the UserAttributes from user.dataValues
            const userAttributes: UserAttribute = user.dataValues;
            resolve(userAttributes);
          } else {
            resolve(null); // User not found
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};
