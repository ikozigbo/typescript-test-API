"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const schemaObj = zod_1.z.object({
    body: zod_1.z.object({}),
    query: zod_1.z.object({}),
    params: zod_1.z.object({}),
});
const validateUser = (Userschema) => async (req, res, next) => {
    try {
        schemaObj.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        await Userschema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
exports.validateUser = validateUser;
// const mySchema = z.string();
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError
