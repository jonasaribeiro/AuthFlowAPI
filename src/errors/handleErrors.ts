import { NextFunction, Request, Response } from "express";
import { AppError } from "./CustomErrors";

/**
 * @class ErrorHandler
 * @description Centralized error handling class for the application.
 */
class ErrorHandler {
  /**
   * Maps an error to a standardized format.
   * @param {Error} err - The error object.
   * @returns {Object} An object containing the status code and message.
   */
  private static defaultErrorMapper(err: Error) {
    // If the error is one of our custom AppErrors, use its status and message.
    if (err instanceof AppError) {
      return {
        status: err.statusCode,
        message: err.message,
      };
    }
    // For other types of errors, use a generic server error message.
    return {
      status: 500,
      message: "Internal Server Error.",
    };
  }

  /**
   * Handles errors and sends appropriate responses to the client.
   * @param {Error} err - The error object.
   * @param {Request} _req - The Express Request object.
   * @param {Response} res - The Express Response object.
   * @param {NextFunction} _next - The Express NextFunction callback.
   * @returns {Response} The Express Response object.
   */
  static async handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const errorHandler = ErrorHandler.defaultErrorMapper;
    const { status, message } = errorHandler(err);
    return res.status(status).json({ message });
  }
}

export default ErrorHandler;
