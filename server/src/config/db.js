import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/forma_ai";
    await mongoose.connect(uri);
    logger.info(`MongoDB connected: ${uri}`);
  } catch (err) {
    logger.error("MongoDB connection failed", err);
    process.exit(1);
  }
}
