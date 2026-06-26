import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = async () => {
  if (!MONGO_URI) {
    console.warn("MONGO_URI is not defined. Running backend in fallback mode without MongoDB.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.warn("MongoDB connection unavailable, continuing in fallback mode:", error.message);
  }
};

export default connectDatabase;
