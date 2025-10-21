import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const productRouter = Router();

productRouter.use(requireAuth);

// CREATE PRODUCT
productRouter.post("/create-product", productController.createProduct);

// RETRIEVE PRODUCTS
productRouter.get("/retrieve-products", productController.retrieveProducts);

// RETRIEVE PRODUCT BY ID
productRouter.get(
  "/retrieve-product/:productId",
  productController.retrieveProductById
);

// UPDATE PRODUCT
productRouter.put(
  "/update-product/:productId",
  productController.updateProduct
);

// DELETE PRODUCT
productRouter.delete(
  "/delete-product/:productId",
  productController.deleteProduct
);

export default productRouter;
