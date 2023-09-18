"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/create-user", user_controller_1.createUserTable);
router.post("/new-user", user_controller_1.newUser);
exports.default = router;
