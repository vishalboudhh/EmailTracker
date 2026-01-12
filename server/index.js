import 'dotenv/config';
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

// CORS configuration - allow multiple origins for deployment

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("JobMail Pro Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);