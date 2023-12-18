import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("User Registration with Existing Email", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  const testUserData = createUserData();

  it("should allow creation of the first user and return its email", async () => {
    const response = await request(app).post("/users").send(testUserData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user.email).toBe(testUserData.email);
  });

  it("should prevent registration with an already existing email, returning status 409", async () => {
    const response = await request(app).post("/users").send(testUserData);
    expect(response.statusCode).toBe(409);
  });

  it("should prevent registration with an already existing email, returning status 409", async () => {
    const userDataWithSameEmail = createUserData({ email: testUserData.email });
    const response = await request(app)
      .post("/users")
      .send(userDataWithSameEmail);
    expect(response.statusCode).toBe(409);
  });

  it("should prevent registration with an already existing email, returning status 409", async () => {
    const userDataWithSamePasswordAndEmail = createUserData({
      email: testUserData.email,
      password: testUserData.password,
    });
    const response = await request(app)
      .post("/users")
      .send(userDataWithSamePasswordAndEmail);
    expect(response.statusCode).toBe(409);
  });
});
