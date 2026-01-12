import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendMail } from "../controllers/mail.controller.js";

const router = express.Router();

// POST /api/mail/send - Protected route
router.post("/send", authMiddleware, sendMail);

export default router;
