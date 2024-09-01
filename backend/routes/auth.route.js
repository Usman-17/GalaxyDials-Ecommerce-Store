import express from "express";
const router = express.Router();

import {
  adminLogout,
  getMe,
  loginAdmin,
  loginUser,
  signup,
  userLogout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/login/admin", loginAdmin);
router.post("/logout", userLogout);
router.post("/logout/admin", adminLogout);

export default router;
