import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.listen(PORT, () => {
  console.log("server is running on port" + PORT);
});
