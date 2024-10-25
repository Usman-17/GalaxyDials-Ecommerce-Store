import express from "express";
const router = express.Router();
import {
  getAllBanners,
  createBanner,
  updateBanner,
  getBanner,
} from "../controllers/banner.controller.js";

// Imports End
router.get("/all", getAllBanners);
router.get("/:id", getBanner);
router.post("/create", createBanner);
router.put("/update/:id", updateBanner);

export default router;
