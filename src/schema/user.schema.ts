import { ZodSchema, number, object, string } from "zod";

type userAttribute = {
  fullname: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export const userSchema: ZodSchema<userAttribute> = object({
  fullname: string({
    required_error: "fullName is required.",
  })
    .nonempty()
    .min(2),
  password: string({
    required_error: "Password is required.",
  })
    .nonempty()
    .min(6, "Password must be atleast six (6) characters long"),
  email: string({
    required_error: "email is required.",
  })
    .nonempty()
    .min(2)
    .email("Invalid email format"),
  phoneNumber: string({
    required_error: "phone-number is required.",
  })
    .regex(/^\d+$/, "Phone number must only contain numeric characters")
    .min(10, "Phone number must be a valid number please"),
  confirmPassword: string({
    required_error: "confirm password required.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"],
});
