import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const entitiesPath: string = path.join(
  __dirname,
  "../domains/**/*.entities.ts"
);

const databaseSettings: DataSourceOptions = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true, // Automatically create the database schema based on entities
  logging: false, // Disable logging for cleaner output
  entities: [entitiesPath],
};

export const AppDataSource = new DataSource(databaseSettings);
