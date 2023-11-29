import "express-async-errors";
import express, { Application } from "express";
import ErrorHandler from "../errors/handleErrors";
import { apiLimiter } from "./rateLimitConfig";
import domains from "../domains/exports";

const app: Application = express();

app.use(apiLimiter);
app.use(express.json());

app.use("/auth", domains.auth);
app.use("/users", domains.users);

app.use(ErrorHandler.handle);

export default app;
