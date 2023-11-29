import request from "supertest";
import { AppDataSource } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import app from "../../src/config/app.routes";

describe("User Registration", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should create a new user", async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("createdAt");
    expect(response.body.user).toHaveProperty("updatedAt");
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.firstName).toBe(userData.firstName);
    expect(response.body.user.lastName).toBe(userData.lastName);
    expect(response.body).not.toHaveProperty("password");
  });

  it("should not allow duplicate email registration", async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    await request(app).post("/users").send(userData);

    userData.firstName = faker.person.firstName();
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(409);
  });

  it("should validate user input fields", async () => {
    const invalidUserData = {
      email: "not-an-email",
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    const response = await request(app).post("/users").send(invalidUserData);
    expect(response.statusCode).toBe(400);
  });

  it("should throw limit error on route", async () => {
    const invalidUserData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    const response = await request(app).post("/users").send(invalidUserData);
    expect(response.statusCode).toBe(429);
  });
});
