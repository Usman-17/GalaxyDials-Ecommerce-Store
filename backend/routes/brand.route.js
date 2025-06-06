import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getAllbrands,
  getBrand,
  updateBrand,
} from "../controllers/brand.controller.js";

router.get("/all", getAllbrands);
router.get("/:id", getBrand);

// Admin Routes
router.post("/create", protectRoute, isAdmin, createBrand);
router.put("/update/:id", protectRoute, isAdmin, updateBrand);
router.delete("/:id", protectRoute, isAdmin, deleteBrand);

export default router;
