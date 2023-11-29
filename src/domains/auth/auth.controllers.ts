import { Request, Response } from "express";

class AuthControllers {
  static login = async (req: Request, res: Response) => {
    const data = req.body;
    return res.status(200).send();
  };

  static refresh = async (req: Request, res: Response) => {
    // Atualizar token
    return res.status(200).send();
  };

  static validate = async (req: Request, res: Response) => {
    // Validar Token
    return res.status(200).send();
  };

  static forgetPassword = async (req: Request, res: Response) => {
    // Gerar código para resetar senha
    return res.status(200).send();
  };

  static resetPassword = async (req: Request, res: Response) => {
    // Resetar senha
    return res.status(200).send();
  };
}

export default AuthControllers;
