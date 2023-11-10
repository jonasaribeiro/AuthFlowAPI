import { AppDataSource } from "../../config/database";
import { User } from "./user.entities";

/**
 * @class UserRepository
 * @description Repository for handling User entity operations.
 * Extends from the base repository provided by TypeORM and uses the
 * custom methods defined in the `extend` method (if any).
 */
const UserRepository = AppDataSource.getRepository(User).extend({
  async findUserByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  },
});

export default UserRepository;
