import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

/**
 * Specifies the path to the entity files. Entities represent the tables (or collections)
 * in the database and define the shape of the data that will be stored.
 */
const entitiesPath: string = path.join(
  __dirname,
  "../domains/**/entities/**/**.{ts,js}"
);

/**
 * Database configuration settings.
 * Uses SQLite for simplicity, making the project easily replicable without external DB setup.
 */
const databaseSettings: DataSourceOptions = {
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true, // Automatically create the database schema based on entities
  logging: false, // Disable logging for cleaner output
  entities: [entitiesPath],
};

export const AppDataSource = new DataSource(databaseSettings);
