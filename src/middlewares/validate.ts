import { z } from "zod";

const mySchema = z.string();

mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError
