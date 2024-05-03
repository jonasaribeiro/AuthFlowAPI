import request from "supertest";
import { AppDataSource } from "../../../src/config/database";
import app from "../../../src/config/app.routes";

describe("Patch Rate Limiter", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should not allow more than 5 access attempts", async () => {
    for (let i = 1; i <= 5; i++) {
      await request(app).patch("/users/id").send();
    }
    const response = await request(app).patch("/users/id").send();
    expect(response.statusCode).toBe(429);
  });
});
