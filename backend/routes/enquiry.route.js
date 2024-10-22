import express from "express";
const router = express.Router();

import {
  createEnquiry,
  deleteEnquiry,
  getAllEnquires,
  getEnquiry,
} from "../controllers/enquiry.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
// Imports End

router.get("/all", getAllEnquires);
router.get("/:id", protectRoute, getEnquiry);
router.post("/create", createEnquiry);
router.delete("/:id", protectRoute, deleteEnquiry);

export default router;
