import { eq } from "drizzle-orm";
import { db, inventory } from "../db";
import { InventoryInsertSchema } from "./types";

export class InventoryRepository {
  static async createInventory(inventorySchema: InventoryInsertSchema) {
    return await db
      .insert(inventory)
      .values({ ...inventorySchema })
      .returning();
  }

  static async deleteInventory(inventoryId: string) {
    return await db
      .delete(inventory)
      .where(eq(inventory.id, inventoryId))
      .returning();
  }
}
