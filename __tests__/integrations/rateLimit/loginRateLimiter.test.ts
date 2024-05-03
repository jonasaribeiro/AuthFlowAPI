import request from "supertest";
import { AppDataSource } from "../../../src/config/database";
import app from "../../../src/config/app.routes";

describe("Login Rate Limiter", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should not allow more than 6 access attempts", async () => {
    for (let i = 1; i <= 6; i++) {
      await request(app).post("/auth/login").send();
    }
    const response = await request(app).post("/auth/login").send();
    expect(response.statusCode).toBe(429);
  });
});
