import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("User Registration with Invalid Fields Format", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should not allow creation of user with invalid email", async () => {
    const userData = createUserData({ email: "invalidEmail" });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should not allow creation of user with invalid email", async () => {
    const userData = createUserData({ email: 10 });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should not allow creation of user with invalid first name", async () => {
    const userData = createUserData({ firstName: 2 });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should not allow creation of user with invalid last name", async () => {
    const userData = createUserData({ lastName: false });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should not allow creation of user with all fields invalid types", async () => {
    const userData = createUserData({
      email: [1, 2, 3],
      firstName: { boolean: false },
      lastName: 0,
      password: false,
    });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });
});
