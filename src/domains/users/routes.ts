import { Router } from "express";
import UserControllers from "./user.controllers";
import {
  patchUserLimiter,
  registerLimiter,
} from "../../config/rateLimitConfig";

const usersRouter: Router = Router();

usersRouter.post("", registerLimiter, UserControllers.register);
usersRouter.get("/:id", UserControllers.getDetail);
usersRouter.patch("/:id", patchUserLimiter, UserControllers.patch);
usersRouter.delete("/:id", UserControllers.delete);

export default usersRouter;
