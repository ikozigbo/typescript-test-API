import sequelize from "../config/dbconnect";
import { UserAttribute } from "../interfaces/user.interface";
import {
  Model,
  Optional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

type optionalUserAttributes = Optional<
  UserAttribute,
  | "id"
  | "createdAt"
  | "verify"
  | "updatedAt"
  | "token"
  | "image"
  | "isAdmin"
  | "authSecret"
  | "twoFactorAuthEnabled"
>;

class User extends Model<UserAttribute, optionalUserAttributes> {
  //   id!: number;
  //  fullname!: string;
  //  email!: string;
  //  password!: string;
  //  phoneNumber!: string;
  //  image!: string;
  //  token!: string;
  //  verify!: boolean;
  //  status!: boolean;
  //  readonly createdAt!: Date;
  //  readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    twoFactorAuthEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    authSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

export default User;
