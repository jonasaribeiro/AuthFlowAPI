import express, { Application } from "express";
import usersRouter from "../domains/users/routes";
import ErrorHandler from "../errors/handleErrors";
import { apiLimiter } from "./rateLimitConfig";
import authRouter from "../domains/auth/routes";

const app: Application = express();

app.use(apiLimiter);

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use(ErrorHandler.handle);

export default app;
