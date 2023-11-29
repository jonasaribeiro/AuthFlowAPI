import { TokenExpiredError, verify } from "jsonwebtoken";
import {
  AuthenticationError,
  ExpiredTokenError,
} from "../../errors/CustomErrors";
import UserRepository from "../users/user.repository";
import { Response } from "express";

class AuthServices {
  static validateToken = async (
    authorization: string | undefined,
    res: Response
  ) => {
    if (!authorization) {
      throw new AuthenticationError("Missing Bearer Token");
    }
    const token = authorization.split(" ")[1];
    let tempDecoded;

    verify(token, "PlaceHolder", (error: any, decoded: any): void => {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError(error.message, error.expiredAt);
      }
      if (error) {
        throw new AuthenticationError("Invalid Token.");
      }
      res.locals.userId = decoded.sub;
    });
  };
}

export default AuthServices;
