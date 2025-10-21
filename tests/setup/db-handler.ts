import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log("🧪 In-memory MongoDB connected");
});

beforeEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;

  const collections = await db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("🧪 In-memory MongoDB stopped");
});
