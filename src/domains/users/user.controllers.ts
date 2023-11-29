import { Request, Response } from "express";
import UserRepository from "./user.repository";

class UserControllers {
  static register = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await UserRepository.registerNewUser(data);
    return res.status(201).json({ user });
  };

  static getDetail = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const foundedUser = await UserRepository.findOneByOrFail({ id: userId });
    return res.status(200).json(foundedUser);
  };

  static patch = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = req.body;
    const updatedUser = await UserRepository.updateUser(userId, data);
    return res.status(200).json({ user: updatedUser });
  };

  static delete = async (req: Request, res: Response) => {
    const { userId } = req.params;
    await UserRepository.delete(userId);
    return res.status(204).send();
  };
}

export default UserControllers;
