import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // For faster queries
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      default: "My Resume",
    },

    driveLink: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^(https?:\/\/)?(drive\.google\.com)\/.+$/,
        "Invalid Google Drive link",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false, // Can mark one resume as default
    },
  },
  { timestamps: true }
);

/* Optional: Ensure unique title per user */
resumeSchema.index({ userId: 1, title: 1 }, { unique: true });

export default mongoose.model("Resume", resumeSchema);
