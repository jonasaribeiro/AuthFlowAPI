import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("User Registration Ignoring Non-allowed Fields", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should create a user and ignore 'id' field", async () => {
    const userData = createUserData({ id: "InvalidId" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.id).not.toBe(userData.id);
  });

  it("should create a user and ignore extra fields", async () => {
    const userData = createUserData({ test: "InvalidField", extra: 10 });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).not.toHaveProperty("test");
    expect(response.body.user).not.toHaveProperty("extra");
  });

  it("should create a user and ignore 'createdAt' field", async () => {
    const userData = createUserData({ createdAt: "InvalidField" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("createdAt");
    expect(response.body.user).not.toBe(userData.createdAt);
  });

  it("should create a user and ignore 'updatedAt' field", async () => {
    const userData = createUserData({ updatedAt: "InvalidField" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("updatedAt");
    expect(response.body.user).not.toBe(userData.updatedAt);
  });
});
