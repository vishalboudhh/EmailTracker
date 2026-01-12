import mongoose from "mongoose";
import { sendEmail as sendBrevoEmail } from "../utils/brevo.js";
import { applicationEmailTemplate } from "../utils/applicationEmailTemplate.js";
import Application from "../models/Application.js";

export const sendMail = async (req, res) => {
  try {
    // Check authentication
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const {
      fromName,
      userEmail,
      hrEmail,
      subject,
      message,
      companyName,
      jobProfile,
      resumeLink,
      portfolioLink,
      phone,
      location,
      notes,
    } = req.body;

    // Validate required fields
    if (!companyName || !jobProfile || !hrEmail) {
      return res.status(400).json({
        success: false,
        message: "Company name, job profile, and HR email are required",
      });
    }

    // Email HTML
    const html = applicationEmailTemplate({
      name: fromName || "Candidate",
      jobProfile: jobProfile || subject || "Role",
      companyName: companyName || "Company",
      resumeLink: resumeLink || "#",
      portfolioLink: portfolioLink || "#",
      email: userEmail || process.env.MAIL_FROM,
      phone: phone || "Not provided",
      location: location || "Not provided",
      notes: notes || message || "",
    });

    // ✅ SEND EMAIL USING BREVO
    await sendBrevoEmail({
      to: hrEmail,
      subject: subject || `Application for ${jobProfile} at ${companyName}`,
      html,
    });

    // Convert string ID to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Save application
    const application = await Application.create({
      userId,
      companyName: companyName.trim(),
      jobProfile: jobProfile.trim(),
      hrEmail: hrEmail.trim().toLowerCase(),
      subject: subject || `Application for ${jobProfile} at ${companyName}`,
      resumeLink: resumeLink || "",
      status: "Applied",
      notes: notes || message || "",
      appliedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully and application saved",
      application,
    });
  } catch (error) {
    console.error("Send mail error:", error);
    res.status(500).json({
      success: false,
      message: "Email failed",
      error: error.message,
    });
  }
};
