import { z, ZodError, ZodType } from "zod";
import { RequestHandler } from "express";

const schemaObj = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({}),
});

type userAttribute = {
  fullname: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export const validateUser =
  (Userschema: ZodType<userAttribute>): RequestHandler =>
  async (req, res, next) => {
    try {
      schemaObj.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      await Userschema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({
          message: errorMessages[0],
        });
      }
      return res.status(500).json({
        message: error.message,
      });
    }
  };

// const mySchema = z.string();

// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError
