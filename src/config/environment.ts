import dotenv from "dotenv";
import { EnvironmentVariableError } from "../errors/CustomErrors";

dotenv.config();

const REQUIRED_ENV_VARIABLES = {
  common: ["SERVER_PORT", "SECRET_KEY", "TOKEN_EXPIRES_IN"],
  development: [],
  production: [],
  test: [],
};

type EnvironmentType = "development" | "production" | "test";

const checkEnvironmentVariables = (): void => {
  const currentEnv = (process.env.NODE_ENV || "development") as EnvironmentType;

  const requiredVariables = [
    ...REQUIRED_ENV_VARIABLES.common,
    ...REQUIRED_ENV_VARIABLES[currentEnv],
  ];

  const missingVariables = requiredVariables.filter(
    (variable) =>
      typeof process.env[variable] === "undefined" ||
      process.env[variable] === ""
  );

  if (missingVariables.length > 0) {
    throw new EnvironmentVariableError(missingVariables);
  }
};

export const NODE_ENV = process.env.NODE_ENV as EnvironmentType;
export const SERVER_PORT = process.env.SERVER_PORT!;
export const SECRET_KEY = process.env.SECRET_KEY!;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN!;

export default checkEnvironmentVariables;
