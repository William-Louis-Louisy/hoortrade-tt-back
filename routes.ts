import { Application } from "express";
import userRouter from "./src/routes/user.routes";
import productRouter from "./src/routes/product.routes";

export function setupRoutes(app: Application) {
  app.use(userRouter);
  app.use(productRouter);
}
