import { Request, Response } from "express";
import UserRepository from "./user.repository";

class UserControllers {
  static register = async (req: Request, res: Response) => {
    const data = req.body;
    // Criar
    return res.status(201).send();
  };

  static getDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const foundedUser = await UserRepository.findOneByOrFail({ id });
    return res.json(foundedUser).status(200);
  };

  static patch = async (req: Request, res: Response) => {
    const data = req.body;
    return res.status(200).send();
  };

  static delete = async (req: Request, res: Response) => {
    return res.status(200).send();
  };
}

export default UserControllers;
