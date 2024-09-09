import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { createProduct } from "../controllers/product.controller.js";

router.post("/create", protectRoute, createProduct);

export default router;
