import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getProduct,
  getProductBySlug,
  updateProduct,
} from "../controllers/product.controller.js";

router.get("/all", getAllproducts);
router.get("/:id", getProduct);
router.get("/slug/:slug", getProductBySlug);

// Admin Routes
router.post("/create", protectRoute, isAdmin, createProduct);
router.put("/update/:id", protectRoute, isAdmin, updateProduct);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);

export default router;
