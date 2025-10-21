import { Request, Response } from "express";
import Product from "../models/product.model";
import { productValidator } from "../validators/product.validator";

// Product Controller
export const productController = {
  createProduct: async function (req: Request, res: Response) {
    try {
      const parsed = productValidator.safeParse(req.body);

      if (!parsed.success) {
        const details = parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
          code: i.code,
        }));
        return res.status(400).json({ error: "Validation failed", details });
      }

      const { name, description, price, image, category, stock } = parsed.data;

      const product = await Product.create({
        name,
        description,
        price,
        image,
        category: category.toLowerCase(),
        stock,
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  retrieveProducts: async function (req: Request, res: Response) {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  retrieveProductById: async function (req: Request, res: Response) {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ error: "Invalid product ID" });
    }
  },

  updateProduct: async function (req: Request, res: Response) {
    const { productId } = req.params;

    const parsed = productValidator.partial().safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code,
      }));
      return res.status(400).json({ error: "Validation failed", details });
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        parsed.data,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: "Invalid product ID" });
    }
  },

  deleteProduct: async function (req: Request, res: Response) {
    const { productId } = req.params;

    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: "Invalid product ID" });
    }
  },
};
