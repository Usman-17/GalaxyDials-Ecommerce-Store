import express from "express";
import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  placeOrder,
  userOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder);
router.get("/userorders", protectRoute, userOrders);

// Admin Routes
router.get("/all", protectRoute, isAdmin, allOrders);

export default router;
