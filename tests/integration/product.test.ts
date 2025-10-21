import request from "supertest";
import { createTestApp } from "../setup/app";
import Product from "../../src/models/product.model";

jest.mock("../../src/middlewares/auth.middleware", () => ({
  requireAuth: (_req: any, _res: any, next: any) => next(),
}));

const app = createTestApp();

describe("Product routes (integration)", () => {
  it("should create a new product successfully", async () => {
    const response = await request(app).post("/create-product").send({
      name: "Test Sauce",
      description: "A tasty test sauce",
      price: 5.99,
      image: "http://example.com/test.png",
      category: "Sauces",
      stock: 999,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Test Sauce");

    const dbProduct = await Product.findOne({ name: "Test Sauce" });
    expect(dbProduct).not.toBeNull();
  });

  it("should return 400 if validation fails", async () => {
    const response = await request(app).post("/create-product").send({
      price: -10,
    });
    expect(response.status).toBe(400);
  });

  it("should retrieve all products", async () => {
    await Product.create({
      name: "Another Product",
      description: "For retrieval test",
      price: 10,
      image: "http://example.com/image.png",
      category: "General",
      stock: 15,
    });

    const response = await request(app).get("/retrieve-products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
