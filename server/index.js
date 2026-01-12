import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import mailRoutes from "./routes/mail.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
connectDB();

/* ===============================
   ✅ CORS CONFIG (VERCEL SAFE)
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://email-tracker-gh0o1n440-vishalboudhhs-projects.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman, server-to-server, Vercel internal
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 🔥 VERY IMPORTANT for preflight
app.options("*", cors(corsOptions));

app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("JobMail Pro Backend Running 🚀");
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
