import authRouter from "./auth/auth.routes";
import usersRouter from "./users/users.routes";

const domains = {
  auth: authRouter,
  users: usersRouter,
};

export default domains;
