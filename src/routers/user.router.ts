import { Router } from "express";
import {
  createUserTable,
  deleteUser,
  login,
  newUser,
  setProfileImage,
  test,
} from "../controllers/user.controller";
import { userAuth, isAdmin } from "../middlewares/authorization";
import { validateUser } from "../middlewares/validate";
import { userSchema } from "../schema/user.schema";

const router = Router();

router.get("/create-user", createUserTable);
router.post("/new-user",validateUser(userSchema), newUser);
router.post("/login", login);
router.post("/set-profile-image", userAuth, setProfileImage);
router.get("/test-endpoint/:id", userAuth, isAdmin, test);
router.delete("/delete-user", deleteUser);

export default router;
