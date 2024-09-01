import express from "express";
const router = express.Router();

import { loginUser, signup } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", loginUser);

export default router;
