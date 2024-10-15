import { z } from "zod";

export const productInsertSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  sku: z.string(),
  price: z.number(),
  categoryId: z.string().uuid(),
  inventoryId: z.string().uuid().optional(),
});

export const productSelectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  categoryId: z.string().uuid(),
  quantity: z.number().nullable(),
  discount: z.number(),
  totalPrice: z.number(),
});

export const productUpdateSchema = z.object({
  id: z.string().uuid(),
  image: z.string().nullable(),
  name: z.string(),
  quantity: z.number(),
  description: z.string(),
  sku: z.string(),
  price: z.number(),
  categoryId: z.string().uuid(),
  inventoryId: z.string().uuid(),
  discountId: z.string().uuid().nullable(),
});

export const productDeleteSchema = z.object({
  productId: z.string().uuid(),
  inventoryId: z.string().uuid(),
});

// CRUD operation products
export type ProductSelectSchema = z.infer<typeof productSelectSchema>;
export type ProductInsertSchema = z.infer<typeof productInsertSchema>;
export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;
export type ProductDeleteSchema = z.infer<typeof productDeleteSchema>;
