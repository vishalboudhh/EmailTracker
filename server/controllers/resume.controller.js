import mongoose from "mongoose";
import Resume from "../models/Resume.js";

export const addResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Convert string ID to ObjectId for proper storage
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const resume = await Resume.create({
      userId: userId,
      ...req.body,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Failed to add resume", error: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    const resumes = await Resume.find({ userId: userId });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Convert both to strings for comparison
    if (resume.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this resume" });
    }

    await resume.deleteOne();
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
};
