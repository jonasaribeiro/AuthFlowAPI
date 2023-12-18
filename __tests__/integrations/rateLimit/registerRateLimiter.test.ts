import { AppDataSource } from "../../../src/config/database";

describe("Register Rate Limiter", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
});
