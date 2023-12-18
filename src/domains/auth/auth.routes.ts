import { Router } from "express";
import { loginLimiter } from "../../config/rateLimitConfig";
import AuthControllers from "./auth.controllers";

const authRouter: Router = Router();

authRouter.post("/login", loginLimiter, AuthControllers.login);
authRouter.post("/refresh", AuthControllers.refresh);
authRouter.post("/validate", AuthControllers.validate);

export default authRouter;
