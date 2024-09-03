import express from "express";

const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { getUser } from "../controllers/user.controller.js";

router.get("/:id", protectRoute, getUser);

export default router;
