import { createInsertSchema } from "drizzle-zod";
import { inventory } from "../db";
import { z } from "zod";

// CRUD operation inventory
export const inventoryInsertSchema = createInsertSchema(inventory);
export type InventoryInsertSchema = z.infer<typeof inventoryInsertSchema>;
