import { AppDataSource } from "../../../../src/config/database";

describe("Successful User Delete", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
});
