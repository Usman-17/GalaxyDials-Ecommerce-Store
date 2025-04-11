import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { placeOrder, userOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder);
router.get("/userorders", protectRoute, userOrders);

export default router;
