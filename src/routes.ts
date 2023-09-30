import userRouter from "./routers/user.router";
import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    return res.send("hello world");
  });

  app.use("/api", userRouter);
}

export default routes;
