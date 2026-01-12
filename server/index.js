import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import mailRoutes from "./routes/mail.routes.js";
import applicationRoutes from "./routes/application.routes.js";

connectDB();

const app = express();

/* =======================
   CORS CONFIG (VERCEL SAFE)
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://email-tracker-gh0o1n440-vishalboudhhs-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // allow server-to-server / vercel internal
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/application", applicationRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "JobMail Pro Backend Running 🚀",
  });
});

/* =======================
   EXPORT FOR VERCEL
======================= */
export default app;
