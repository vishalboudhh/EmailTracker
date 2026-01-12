import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addResume,
  getResumes,
  deleteResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

/**
 * @route   POST /api/resume
 * @desc    Add a new resume
 * @access  Private
 */
router.post("/", authMiddleware, addResume);

/**
 * @route   GET /api/resume
 * @desc    Get all resumes of logged-in user
 * @access  Private
 */
router.get("/", authMiddleware, getResumes);

/**
 * @route   DELETE /api/resume/:id
 * @desc    Delete a resume
 * @access  Private
 */
router.delete("/:id", authMiddleware, deleteResume);

export default router;
