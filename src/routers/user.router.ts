import { Router } from "express";
import { createUserTable } from "../controllers/user.controller";

const router = Router();

router.get("/create-user", createUserTable);

export default router;
