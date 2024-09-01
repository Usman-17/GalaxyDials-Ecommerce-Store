import express from "express";
const router = express.Router();

import {
  loginAdmin,
  loginUser,
  signup,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/login/admin", loginAdmin);

export default router;
