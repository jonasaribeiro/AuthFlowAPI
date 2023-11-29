import "reflect-metadata";
import { AppDataSource } from "./config/database";
import app from "./config/app.routes";
import checkEnvironmentVariables, { SERVER_PORT } from "./config/environment";

checkEnvironmentVariables();

AppDataSource.initialize()
  .then(async () => {
    app.listen(parseInt(SERVER_PORT, 10), () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });
2;
