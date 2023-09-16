import sequelize from "../dbconfig/dbconfig";
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
  "id" | "createdAt" | "verify" | "updatedAt" | "token" | "image"
>;

class User extends Model<UserAttribute, optionalUserAttributes> {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public image!: string;
  public token!: string;
  public verify!: boolean;
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "user",
  }
);

export default User;
