import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { addToCart } from "../controllers/cart.controller.js";

router.post("/add", protectRoute, addToCart);

export default router;
