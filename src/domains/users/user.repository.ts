import { AppDataSource } from "../../config/database";
import { User } from "./user.entities";
import { sUserValidResponse } from "./user.schemas";
import { tUserValidResponse } from "./user.types";

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

  async registerNewUser(data: Partial<User>): Promise<tUserValidResponse> {
    const newUser = this.create(data);
    await this.save(newUser);
    const validUserRes = sUserValidResponse.parse(newUser);
    return validUserRes;
  },

  async updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<tUserValidResponse> {
    const userToUpdate = await this.findOneByOrFail({ id: userId });
    const mergedUser = this.merge(userToUpdate, data);
    await this.save(mergedUser);
    const validUserRes = sUserValidResponse.parse(mergedUser);
    return validUserRes;
  },
});

export default UserRepository;
