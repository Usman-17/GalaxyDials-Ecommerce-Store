import express from "express";
const router = express.Router();

import {
  adminLogout,
  loginAdmin,
  loginUser,
  signup,
  userLogout,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/login/admin", loginAdmin);
router.post("/logout", userLogout);
router.post("/logout/admin", adminLogout);

export default router;
