export interface UserAttribute {
  id: number;
  fullname: string;
  password: string;
  email: string;
  image: string;
  phoneNumber: string;
  token: string;
  verify: boolean;
  isAdmin: boolean;
  updatedAt: Date;
  createdAt: Date;
}
