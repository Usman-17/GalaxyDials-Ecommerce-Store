import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

router.get("/all", getAllproducts);
router.get("/:id", getProduct);

// Admin Routes
router.post("/create", protectRoute, isAdmin, createProduct);
router.put("/update/:id", protectRoute, isAdmin, updateProduct);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);

export default router;
