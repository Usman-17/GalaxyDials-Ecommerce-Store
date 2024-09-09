import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { createProduct, updateProduct } from "../controllers/product.controller.js";

router.post("/create", protectRoute, createProduct);
router.put("/update/:id", protectRoute, updateProduct);

export default router;
