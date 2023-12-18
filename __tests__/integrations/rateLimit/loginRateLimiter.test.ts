import { AppDataSource } from "../../../src/config/database";

describe("Login Rate Limiter", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
});
