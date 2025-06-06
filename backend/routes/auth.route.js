import express from "express";
const router = express.Router();

import {
  forgotPassword,
  getUser,
  logout,
  resetPassword,
  signup,
  updateProfile,
  userLogin,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

// Auth routes
router.post("/signup", signup);
router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Protected user routes
router.get("/user", protectRoute, getUser);
router.put("/profile/update", protectRoute, updateProfile);

export default router;
