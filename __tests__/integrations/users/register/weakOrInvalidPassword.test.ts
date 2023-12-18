import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("User Registration with Weak or Invalid Password", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should fail when the password has less than 8 of length, returning status 400", async () => {
    const userData = createUserData({ password: "Pass1" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should fail when the password doen't have at least one number, returning status 400", async () => {
    const userData = createUserData({ password: "Password" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should fail when the password contains only numbers, returning status 400", async () => {
    const userData = createUserData({ password: "12345678" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should fail when the password doesn't have at leat one lowercase, returning status 400", async () => {
    const userData = createUserData({ password: "PASSWORD123" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should fail when the password doesn't have at leat one uppercase, returning status 400", async () => {
    const userData = createUserData({ password: "password123" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });
});
