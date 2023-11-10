import { Router } from "express";
import {
  loginLimiter,
  resetPasswordLimiter,
} from "../../config/rateLimitConfig";
import AuthControllers from "./auth.controllers";

const authRouter: Router = Router();

authRouter.post("/login", loginLimiter, AuthControllers.login);
authRouter.post("/logout", AuthControllers.logout);
authRouter.post("/refresh", AuthControllers.refresh);
authRouter.post("/validate", AuthControllers.validate);
authRouter.post("/forgot-password", AuthControllers.forgetPassword);
authRouter.patch(
  "/reset-password",
  resetPasswordLimiter,
  AuthControllers.resetPassword
);

export default authRouter;
