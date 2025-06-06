import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getUser,
  updateUserRole,
} from "../controllers/user.controller.js";

router.get("/:id", protectRoute, getUser);

// Admin Routes
router.get("/", protectRoute, isAdmin, getAllUsers);
router.put("/role/:id", protectRoute, isAdmin, updateUserRole);

export default router;
