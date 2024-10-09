import { z } from "zod";
import { products } from "../db";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const productSelectSchema = createSelectSchema(products);
export const productInsertSchema = createInsertSchema(products);
export const productUpdateSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  price: z.number(),
  categoryId: z.string().uuid(),
});

// CRUD operation products
export type ProductSelectSchema = z.infer<typeof productSelectSchema>;
export type ProductInsertScehma = z.infer<typeof productInsertSchema>;
export type ProductUpdateSchema = Required<
  Pick<
    ProductInsertScehma,
    "id" | "image" | "sku" | "price" | "name" | "description"
  >
>;
