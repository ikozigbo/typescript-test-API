export interface UserAttribute {
  id: number;
  fullname: string;
  password: string;
  email: string;
  image: string;
  phoneNumber: string;
  token: string;
  verify: boolean;
  updatedAt: Date;
  createdAt: Date;
}
