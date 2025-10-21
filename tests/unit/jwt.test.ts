import jwt from "jsonwebtoken";

const JWT_SECRET = "test_secret";
const maxAge = 30 * 24 * 60 * 60;

const createToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });
};

describe("JWT utility", () => {
  it("should generate a valid token containing user id", () => {
    const token = createToken("123456");
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    expect(decoded).toHaveProperty("id", "123456");
    expect(decoded).toHaveProperty("exp");
  });
});
