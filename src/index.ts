import "reflect-metadata";
import "express-async-errors";
import { AppDataSource } from "./config/database";
import app from "./config/app.routes";

/**
 * Initialize the application by setting up the database connection
 * and then launching the server.
 */

// Initialize the database connection using the AppDataSource.
AppDataSource.initialize()
  .then(async () => {
    // Once the database is initialized, start the server.
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err: any) => {
    // Log any errors that occurred during the initialization.
    console.error("Error during Data Source initialization", err);
  });
