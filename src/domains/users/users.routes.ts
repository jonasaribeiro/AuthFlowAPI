import { Router } from "express";
import UserControllers from "./user.controllers";
import {
  patchUserLimiter,
  registerLimiter,
} from "../../config/rateLimitConfig";
import Validators from "../../common/validators";
import { sUserPatchBody, sUserRegistrationBody } from "./user.schemas";
import UserMiddlewares from "./user.middlewares";

const usersRouter: Router = Router();

usersRouter.post(
  "",
  registerLimiter,
  Validators.validateBody(sUserRegistrationBody),
  UserMiddlewares.bodyEmailIsUnique,
  UserControllers.register
);
usersRouter.get("/:userId", UserControllers.getDetail);
usersRouter.patch(
  "/:userId",
  patchUserLimiter,
  Validators.validateBody(sUserPatchBody),
  UserControllers.patch
);
usersRouter.delete("/:userId", UserControllers.delete);

export default usersRouter;
