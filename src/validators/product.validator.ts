import { z } from "zod";

export const productValidator = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .max(120, "Product name must be at most 120 characters long"),
  description: z
    .string()
    .min(2, "Product description must be at least 2 characters long")
    .max(500, "Product description must be at most 500 characters long"),
  price: z.number().min(0, "Product price must be at least 0"),
  image: z.url("Product image must be a valid URL"),
  category: z
    .string()
    .min(2, "Product category must be at least 2 characters long")
    .max(120, "Product category must be at most 120 characters long"),
  stock: z.number().min(0, "Product stock must be at least 0"),
});
