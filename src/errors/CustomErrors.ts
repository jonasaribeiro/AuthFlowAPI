/**
 * @module CustomErrors
 * @description Provides custom error classes for specific application scenarios.
 */

/**
 * Represents a generic application error with a customizable message and status code.
 */
export class AppError extends Error {
  statusCode: number;

  /**
   * @constructor
   * @param {string} message - The error message.
   * @param {number} [statusCode=400] - The HTTP status code for the error.
   */
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

/**
 * Factory function to create custom error classes.
 * @param {string} defaultMessage - The default error message.
 * @param {number} statusCode - The default HTTP status code.
 * @returns {AppError} A custom error class.
 */
const errorFactory = (defaultMessage: string, statusCode: number) => {
  return class extends AppError {
    constructor(message: string = defaultMessage) {
      super(message, statusCode);
    }
  };
};

/**
 * @class AuthenticationError
 * @extends {AppError}
 * @description Generic error for authentication failures.
 * @defaultMessage "Authentication failed."
 * @defaultStatusCode 401
 */
export const AuthenticationError = errorFactory("Authentication failed.", 401);

/**
 * @class InvalidCredentialsError
 * @extends {AppError}
 * @description Specific error for invalid credentials.
 * @defaultMessage "Invalid credentials."
 * @defaultStatusCode 403
 */
export const InvalidCredentialsError = errorFactory(
  "Invalid credentials.",
  403
);

/**
 * @class ExpiredTokenError
 * @extends {AppError}
 * @description Error for expired token.
 * @defaultMessage "Token has expired."
 * @defaultStatusCode 401
 */
export const ExpiredTokenError = errorFactory("Token has expired.", 401);

/**
 * @class NotFoundError
 * @extends {AppError}
 * @description Error for not found resources.
 * @defaultMessage "Resource not found."
 * @defaultStatusCode 404
 */
export const NotFoundError = errorFactory("Resource not found.", 404);

/**
 * @class AccessDeniedError
 * @extends {AppError}
 * @description Error for denied access.
 * @defaultMessage "Access denied."
 * @defaultStatusCode 403
 */
export const AccessDeniedError = errorFactory("Access denied.", 403);

/**
 * @class RateLimitExceededError
 * @extends {AppError}
 * @description Error for exceeding rate limit.
 * @defaultMessage "Rate limit exceeded. Try again later."
 * @defaultStatusCode 429
 */
export const RateLimitExceededError = errorFactory(
  "Rate limit exceeded. Try again later.",
  429
);

/**
 * @class InvalidRequestError
 * @extends {AppError}
 * @description Error for invalid request parameters.
 * @defaultMessage "Invalid request."
 * @defaultStatusCode 400
 */
export const InvalidRequestError = errorFactory("Invalid request.", 400);

/**
 * @class ServerError
 * @extends {AppError}
 * @description Error for unexpected server issues.
 * @defaultMessage "Server error. Please try again later."
 * @defaultStatusCode 500
 */
export const ServerError = errorFactory(
  "Server error. Please try again later.",
  500
);

/**
 * @class UserAlreadyExistsError
 * @extends {AppError}
 * @description Error when trying to create a user that already exists.
 * @defaultMessage "User already exists."
 * @defaultStatusCode 409
 */
export const UserAlreadyExistsError = errorFactory("User already exists.", 409);

// Adicione mais erros personalizados conforme necessário
