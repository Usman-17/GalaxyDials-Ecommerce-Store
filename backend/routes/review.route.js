import express from "express";

const router = express.Router();

import {
  addProductReview,
  deleteProductReview,
  getReviewsByProduct,
  updateProductReview,
} from "../controllers/review.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

router.get("/:id", getReviewsByProduct);
router.post("/add", protectRoute, addProductReview);
router.put("/update/:reviewId", protectRoute, updateProductReview);
router.delete("/:id", protectRoute, deleteProductReview);

export default router;
