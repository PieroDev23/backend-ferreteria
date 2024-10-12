import bcrypt from "bcrypt";
import { UserInserSchema } from "./types";
import { UserRepository } from "./repository";

export class UserService {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  static comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static async createUser(user: UserInserSchema) {
    return await UserRepository.createUser(user);
  }

  static async userExists(email: string) {
    return !!(await UserRepository.getUserByEmail(email));
  }
}
