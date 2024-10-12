import { eq } from "drizzle-orm";
import { db, users } from "../db";
import { UserInserSchema } from "./types";

export class UserRepository {
  static async createUser(user: UserInserSchema) {
    return await db
      .insert(users)
      .values({ ...user })
      .returning();
  }

  static async getUserByEmail(email: string) {
    return await db.select().from(users).where(eq(users.email, email));
  }
}
