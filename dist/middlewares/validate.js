"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mySchema = zod_1.z.string();
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError
