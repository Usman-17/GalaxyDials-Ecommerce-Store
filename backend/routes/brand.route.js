import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getAllbrands,
  getBrand,
  updateBrand,
} from "../controllers/brand.controller.js";

router.get("/all", getAllbrands);
router.get("/:id", getBrand);
router.post("/create", protectRoute, createBrand);
router.put("/update/:id", protectRoute, updateBrand);
router.delete("/:id", protectRoute, deleteBrand);

export default router;
