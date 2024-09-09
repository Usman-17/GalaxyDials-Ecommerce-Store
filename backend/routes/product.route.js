import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllproducts,
  getProduct,
  removeFromWishlist,
  updateProduct,
} from "../controllers/product.controller.js";

router.get("/all", getAllproducts);
router.get("/:id", getProduct);
router.post("/create", protectRoute, createProduct);
router.put("/update/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);
router.post("/wishlist/:productId", protectRoute, addToWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);

export default router;
