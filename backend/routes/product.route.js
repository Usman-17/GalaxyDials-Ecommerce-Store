import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

router.get("/all", getAllproducts);
router.get("/:id", getProduct);
router.post("/create", protectRoute, createProduct);
router.put("/update/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
