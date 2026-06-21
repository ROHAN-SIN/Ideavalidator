import mongoose from "mongoose";

// Fail fast instead of hanging for 10s when MongoDB isn't reachable —
// the app should still work (just without saved history) if DB is down.
mongoose.set("bufferCommands", false);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️  MONGO_URI not set — skipping DB connection (history won't be saved).");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("Server will keep running, but saved history won't work until MongoDB is reachable.");
  }
};

export default connectDB;
