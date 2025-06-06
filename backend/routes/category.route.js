import express from "express";

const router = express.Router();

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";

router.get("/all", getAllCategories);
router.get("/:id", getCategory);

// Admin Routes
router.post("/create", protectRoute, isAdmin, createCategory);
router.put("/update/:id", protectRoute, isAdmin, updateCategory);
router.delete("/:id", protectRoute, isAdmin, deleteCategory);

export default router;
