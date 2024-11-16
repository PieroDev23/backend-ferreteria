import { eq } from "drizzle-orm";
import { db, usersAddresses } from "../db";
import { InsertUserAddressSchema } from "./types";

export class UserAdressesRepository {
  static async getUserAddress(userId: string) {
    return await db
      .select()
      .from(usersAddresses)
      .where(eq(usersAddresses.userId, userId));
  }

  static async createUserAddress(payload: InsertUserAddressSchema) {
    return await db
      .insert(usersAddresses)
      .values({ ...payload })
      .returning();
  }
}
