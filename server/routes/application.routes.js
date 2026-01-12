import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationStats,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getApplications);
router.post("/", authMiddleware, createApplication);
router.get("/stats", authMiddleware, getApplicationStats);
router.get("/:id", authMiddleware, getApplicationById);
router.put("/:id", authMiddleware, updateApplication);
router.patch("/:id/status", authMiddleware, updateApplicationStatus);
router.delete("/:id", authMiddleware, deleteApplication);

export default router;
