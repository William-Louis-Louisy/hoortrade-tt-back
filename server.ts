import cors from "cors";
import express from "express";
import { setupRoutes } from "./routes";
import cookieParser from "cookie-parser";
import { connectDB, disconnectDB } from "./src/config/db";

const app = express();
app.set("trust proxy", 1);

const FRONT_PROD = "https://hoortrade-tt-front.vercel.app";

const allowedOrigins = new Set([FRONT_PROD, "http://localhost:3000"]);

const corsOptions: cors.CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    let hostname: string | null = null;
    try {
      hostname = new URL(origin).hostname;
    } catch {
      hostname = null;
    }

    const ok =
      allowedOrigins.has(origin) ||
      (hostname != null && /\.vercel\.app$/i.test(hostname));

    return cb(ok ? null : new Error("CORS: Origin not allowed"), ok);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

app.use(cors(corsOptions));

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
