"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authorization_1 = require("../middlewares/authorization");
const router = (0, express_1.Router)();
router.get("/create-user", user_controller_1.createUserTable);
router.post("/new-user", user_controller_1.newUser);
router.post("/login", user_controller_1.login);
router.post("/set-profile-image", authorization_1.userAuth, user_controller_1.setProfileImage);
router.get("/test-endpoint", authorization_1.userAuth, authorization_1.isAdmin, user_controller_1.test);
router.delete("/delete-user", user_controller_1.deleteUser);
exports.default = router;
