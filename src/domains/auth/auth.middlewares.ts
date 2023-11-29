import { NextFunction, Request, Response } from "express";
import AuthServices from "./auth.services";
import UserRepository from "../users/user.repository";
import { NotFoundError } from "../../errors/CustomErrors";

class AuthMiddlewares {
  static validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.headers.authorization;
    await AuthServices.validateToken(authorization, res);
    const userExist = UserRepository.exist({
      where: { id: res.locals.userId },
    });
    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return next();
  };
}

export default AuthMiddlewares;
