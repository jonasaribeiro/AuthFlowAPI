import { NextFunction, Request, Response } from "express";
import UserRepository from "./user.repository";
import { AppError, NotFoundError } from "../../errors/CustomErrors";

class UserMiddlewares {
  static bodyEmailIsUnique = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    const exists = await UserRepository.exist({ where: { email } });
    if (exists) {
      throw new AppError("Email must be unique.", 409);
    }
    return next();
  };

  static paramUserIdIsValid = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;
    const exists = await UserRepository.exist({ where: { id: userId } });
    if (!exists) {
      throw new NotFoundError("User not found.");
    }
    return next();
  };
}

export default UserMiddlewares;
