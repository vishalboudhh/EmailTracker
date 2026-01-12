import mongoose from "mongoose";
import Application from "../models/Application.js";

/**
 * @desc    Get all job applications of logged-in user
 * @route   GET /api/application
 * @access  Private
 */
export const getApplications = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    const applications = await Application.find({
      userId: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

/**
 * @desc    Get single application by ID
 * @route   GET /api/application/:id
 * @access  Private
 */
export const getApplicationById = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Ownership check (important)
    // Convert both to strings for comparison
    if (application.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Get Application Error:", error);
    res.status(500).json({ message: "Error fetching application" });
  }
};

/**
 * @desc    Update application status
 * @route   PATCH /api/application/:id/status
 * @access  Private
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const allowedStatus = ["Applied", "Replied", "Rejected", "Interview", "Offer"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const updated = await Application.findOneAndUpdate(
      { _id: id, userId: userId },
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application: updated,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

/**
 * @desc    Delete application
 * @route   DELETE /api/application/:id
 * @access  Private
 */
export const deleteApplication = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const application = await Application.findOne({
      _id: id,
      userId: userId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
};

/**
 * @desc    Create a new application (manual)
 * @route   POST /api/application
 * @access  Private
 */
export const createApplication = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { companyName, jobProfile, status, notes, appliedAt, location, subject, hrEmail, resumeLink } = req.body;

    if (!companyName || !jobProfile) {
      return res.status(400).json({ message: "companyName and jobProfile are required" });
    }

    // Convert string ID to ObjectId for proper storage
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const application = await Application.create({
      userId: userId,
      companyName,
      jobProfile,
      status: status || "Applied",
      notes: notes || "",
      appliedAt: appliedAt ? new Date(appliedAt) : Date.now(),
      location: location || "",
      subject: subject || "",
      hrEmail: hrEmail || "",
      resumeLink: resumeLink || "",
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Create Application Error:", error);
    res.status(500).json({ message: "Failed to create application", error: error.message });
  }
};

/**
 * @desc    Update whole application (manual edit)
 * @route   PUT /api/application/:id
 * @access  Private
 */
export const updateApplication = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;

    const updates = (({ companyName, jobProfile, status, notes, appliedAt, location, subject, hrEmail, resumeLink }) => ({ companyName, jobProfile, status, notes, appliedAt, location, subject, hrEmail, resumeLink }))(req.body);

    // Clean undefined values
    Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

    if (updates.appliedAt) updates.appliedAt = new Date(updates.appliedAt);

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const updated = await Application.findOneAndUpdate(
      { _id: id, userId: userId },
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application updated successfully", application: updated });
  } catch (error) {
    console.error("Update Application Error:", error);
    res.status(500).json({ message: "Failed to update application", error: error.message });
  }
};

/**
 * @desc    Get application statistics (dashboard cards)
 * @route   GET /api/application/stats
 * @access  Private
 */
export const getApplicationStats = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Convert string ID to ObjectId for proper querying
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const [total, applied, replied, rejected, interview, offer] =
      await Promise.all([
        Application.countDocuments({ userId }),
        Application.countDocuments({ userId, status: "Applied" }),
        Application.countDocuments({ userId, status: "Replied" }),
        Application.countDocuments({ userId, status: "Rejected" }),
        Application.countDocuments({ userId, status: "Interview" }),
        Application.countDocuments({ userId, status: "Offer" }),
      ]);

    res.status(200).json({
      total,
      applied,
      replied,
      rejected,
      interview,
      offer,
    });
  } catch (error) {
    console.error("Application Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};
