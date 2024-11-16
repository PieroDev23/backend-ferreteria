import { db, guests } from "../db";
import { InsertGuestsSchema } from "./types";

export class GuestRepository {
  static async createGuest(guest: InsertGuestsSchema) {
    return await db
      .insert(guests)
      .values({ ...guest })
      .returning();
  }
}
