import { Router } from "express";
import { createUserTable, newUser } from "../controllers/user.controller";

const router = Router();

router.get("/create-user", createUserTable);
router.post("/new-user", newUser);

export default router;
