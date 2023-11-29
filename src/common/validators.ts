import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

class Validators {
  static validateBody = (schema: ZodTypeAny) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      return next();
    };
  };
}

export default Validators;
