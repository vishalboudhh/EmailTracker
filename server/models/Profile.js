import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
      index: true,
    },

    defaultResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    preferredJobProfile: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    emailSignature: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    autoFillEnabled: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
