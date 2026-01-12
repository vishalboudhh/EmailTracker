import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ Email server connection failed:", err);
  } else {
    console.log("✅ Email server ready");
  }
});

export default transporter;
