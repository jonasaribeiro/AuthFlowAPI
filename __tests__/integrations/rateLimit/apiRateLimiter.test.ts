import request from "supertest";
import { AppDataSource } from "../../../src/config/database";
import app from "../../../src/config/app.routes";

describe("General Api Rate Limiter", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should now allow more than 20 access attempts", async () => {
    for (let i = 1; i <= 20; i++) {
      await request(app).get("/users/id").send();
    }
    const response = await request(app).get("/users/id").send();
    expect(response.statusCode).toBe(429);
  });
});
