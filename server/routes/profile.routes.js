import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

/**
 * @route   GET /api/profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/", authMiddleware, getProfile);

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put("/", authMiddleware, updateProfile);

export default router;
