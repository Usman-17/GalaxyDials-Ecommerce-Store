import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder);

export default router;
