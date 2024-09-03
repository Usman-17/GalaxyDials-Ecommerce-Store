import express from "express";
const router = express.Router();

import {
  adminLogout,
  forgotPassword,
  getMe,
  loginAdmin,
  loginUser,
  resetPassword,
  signup,
  updateProfile,
  userLogout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/login/admin", loginAdmin);
router.post("/logout", userLogout);
router.post("/logout/admin", adminLogout);
router.put("/profile/update", protectRoute, updateProfile);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
