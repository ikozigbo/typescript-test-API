import { Router } from "express";
import {
  createUserTable,
  deleteUser,
  login,
  newUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/create-user", createUserTable);
router.post("/new-user", newUser);
router.post("/login", login);
router.delete("/delete-user", deleteUser);

export default router;
