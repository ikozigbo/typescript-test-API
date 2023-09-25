import { Router } from "express";
import {
  createUserTable,
  deleteUser,
  login,
  newUser,
  test,
} from "../controllers/user.controller";
import { userAuth, isAdmin } from "../middlewares/authorization";

const router = Router();

router.get("/create-user", createUserTable);
router.post("/new-user", newUser);
router.post("/login", login);
router.get("/test-endpoint", userAuth, isAdmin, test);
router.delete("/delete-user", deleteUser);

export default router;
