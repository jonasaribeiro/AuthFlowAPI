import { NextFunction, Request, Response } from "express";

class UserMiddlewares {
  static emailAlreadyExists = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return next();
  };
}
