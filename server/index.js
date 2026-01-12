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
  'http://localhost:5173',
  // Allow Vercel preview and production deployments
  /^https:\/\/.*\.vercel\.app$/,
  // Add your specific Vercel URL if needed
  'https://emailteacker-9j7yhy49u-vishalboudhhs-projects.vercel.app'
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      }
      // Handle regex patterns
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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