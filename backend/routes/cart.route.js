import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { addToCart, getUserCart, updateCart } from "../controllers/cart.controller.js";

router.get("/get", protectRoute, getUserCart);
router.post("/add", protectRoute, addToCart);
router.put("/update", protectRoute, updateCart);

export default router;
