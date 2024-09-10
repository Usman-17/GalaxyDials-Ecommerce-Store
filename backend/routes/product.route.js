import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
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
router.post("/create", isAdmin, protectRoute, createProduct);
router.put("/update/:id", isAdmin, protectRoute, updateProduct);
router.delete("/:id", isAdmin, protectRoute, deleteProduct);
router.post("/wishlist/:productId", protectRoute, addToWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);

export default router;
