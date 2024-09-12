import express from "express";

const router = express.Router();

import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import { getAllUsers, getUser } from "../controllers/user.controller.js";

router.get("/:id", isAdmin, protectRoute, getUser);
router.get("/",  getAllUsers);

export default router;
