import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    hrEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    jobProfile: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    subject: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    resumeLink: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Replied",
        "Rejected",
        "Interview",
        "Offer",
      ],
      default: "Applied",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Application", applicationSchema);
