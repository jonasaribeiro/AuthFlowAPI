import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("Successful User Registration", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  const createAndValidateNewUser = async (userData: any) => {
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
  };

  it("should create a new user and return valid data", async () => {
    const userData = createUserData();
    await createAndValidateNewUser(userData);
  });

  it("should create a new user and return valid data", async () => {
    const userData = createUserData();
    await createAndValidateNewUser(userData);
  });

  it("should allow creating a new user with an empty first name and return valid data", async () => {
    const userData = createUserData({ firstName: "" });
    await createAndValidateNewUser(userData);
  });

  it("should allow creating a new user with an empty last name and return valid data", async () => {
    const userData = createUserData({ lastName: "" });
    await createAndValidateNewUser(userData);
  });

  it("should allow creating a new user with both first and last names empty and return valid data", async () => {
    const userData = createUserData({ firstName: "", lastName: "" });
    await createAndValidateNewUser(userData);
  });
});
