import request from "supertest";
import { AppDataSource } from "../../../../src/config/database";
import app from "../../../../src/config/app.routes";
import createUserData from "../../../mocks/user.mock";

describe("User Registration with Missing Required Data", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should reject registration if body has no 'email' field, returning status 400", async () => {
    const userData: any = createUserData();
    delete userData.email;
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should reject registration if body field 'email' being undefined, returning status 400", async () => {
    const userData = createUserData({ email: undefined });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should reject registration if body has no 'password' field, returning status 400", async () => {
    const userData: any = createUserData();
    delete userData.password;
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });

  it("should reject registration if body field 'password' being undefined, returning status 400", async () => {
    const userData = createUserData({ password: undefined });
    const response = await request(app).post("/users").send(userData);
    expect(response.statusCode).toBe(400);
  });
});
