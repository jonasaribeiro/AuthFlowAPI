export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class EnvironmentVariableError extends AppError {
  constructor(missingVariables: string[]) {
    super("Environment variable error", 500);
    console.error(
      "============================================================================",
      "\nErro crítico: As seguintes variáveis de ambiente necessárias estão faltando:\n",
      "\n*",
      missingVariables.join("\n* "),
      "\n\n============================================================================\n"
    );
  }
}

const errorFactory = (defaultMessage: string, statusCode: number) => {
  return class extends AppError {
    constructor(message: string = defaultMessage) {
      super(message, statusCode);
    }
  };
};

export const AuthenticationError = errorFactory("Authentication failed.", 401);

export const InvalidCredentialsError = errorFactory(
  "Invalid credentials.",
  403
);

export class ExpiredTokenError extends AppError {
  expiredIn: Date;

  constructor(message: string = "Expired Token", expiredIn: Date) {
    super(message, 401);
    this.expiredIn = expiredIn;
  }
}

export const NotFoundError = errorFactory("Resource not found.", 404);

export const AccessDeniedError = errorFactory("Access denied.", 403);

export const RateLimitExceededError = errorFactory(
  "Rate limit exceeded. Try again later.",
  429
);

export const InvalidRequestError = errorFactory("Invalid request.", 400);

export const ServerError = errorFactory(
  "Server error. Please try again later.",
  500
);

export const UserAlreadyExistsError = errorFactory("User already exists.", 409);
