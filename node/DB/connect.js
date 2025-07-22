const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");

    mongoose.Promise = global.Promise;

    const options = {
      connectTimeoutMS: 30000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("✅ MongoDB connected successfully.");
    });

    db.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    db.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected.");
    });

    // Optional: handle when app closes
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔒 MongoDB connection closed due to app termination.");
      process.exit(0);
    });
  } catch (error) {
    console.error("🚨 Initial MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
