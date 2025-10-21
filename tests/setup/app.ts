import express from "express";
import cookieParser from "cookie-parser";
import { setupRoutes } from "../../routes";

export const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  setupRoutes(app);
  return app;
};
