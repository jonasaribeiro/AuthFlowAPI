import { Request, Response } from "express";

class AuthControllers {
  static login = async (req: Request, res: Response) => {
    const data = req.body;
    return res.status(200).send();
  };

  static logout = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  static refresh = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  static validate = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  static forgetPassword = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  static resetPassword = async (req: Request, res: Response) => {
    return res.status(200).send();
  };
}

export default AuthControllers;
