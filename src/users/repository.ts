import { eq } from "drizzle-orm";
import { db, users } from "../db";
import { UserInsertSchema } from "./types";

export class UserRepository {
  static async createUser(user: UserInsertSchema) {
    return await db
      .insert(users)
      .values({ ...user })
      .returning({
        id: users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        phone: users.phone,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt,
      });
  }

  static async findUserByEmail(email: string) {
    return await db
      .select({
        id: users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        phone: users.phone,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));
  }
}
