import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "../db";
import { z } from "zod";

export const categorySelectSchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);

export type CategorySelectSchema = z.infer<typeof categorySelectSchema>;
export type CategoryInsertSchema = z.infer<typeof categoryInsertSchema>;
