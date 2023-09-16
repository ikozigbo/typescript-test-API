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
