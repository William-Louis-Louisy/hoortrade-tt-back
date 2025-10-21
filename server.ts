import cors from "cors";
import express from "express";
import { setupRoutes } from "./routes";
import cookieParser from "cookie-parser";
import { connectDB, disconnectDB } from "./src/config/db";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

setupRoutes(app);

const PORT: number = Number(process.env.PORT) || 5000;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  const shutdown = async () => {
    console.log("🔴 Server is shutting down gracefully...");
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
});
