import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      autoIndex: process.env.NODE_ENV !== "production",
    });
    console.log("🟢 Connected to database");
  } catch (err) {
    console.error("🔴 Database connection error:", err);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.connection.close();
  console.log("🔴 Database connection closed");
}
