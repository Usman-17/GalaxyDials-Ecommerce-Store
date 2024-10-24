import express from "express";
const router = express.Router();
import {
  getAllBanners,
  createBanner,
  updateBanner,
  getBanner,
} from "../controllers/banner.controller.js";

// Imports End
router.post("/create", createBanner);
router.put("/update/:id", updateBanner);
router.get("/:id", getBanner);
router.get("/all", getAllBanners);

export default router;
