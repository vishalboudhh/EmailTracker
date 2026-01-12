import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+?\d{1,3}[- ]?)?\d{10}$/,
        "Phone number must be valid (10 digits or with country code)",
      ],
      default: "",
    },

    portfolio: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d#?&=.-]*)*\/?$/,
        "Invalid portfolio URL",
      ],
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
  },
  { timestamps: true }
);



export default mongoose.model("User", userSchema);
 