import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["applicant", "reviewer", "admin"], default: "applicant" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
