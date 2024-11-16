import { z } from "zod";

export const insertOrderSchema = z.object({
  userId: z.string().uuid().nullable(),
  lastname: z.string(),
  firstname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  country: z.string(),
  city: z.string(),
  totalAmount: z.number(),
  items: z
    .object({
      productId: z.string().uuid(),
      quantity: z.number(),
      categoryId: z.string().uuid(),
    })
    .array(),
});

export type InsertOrderSchema = z.infer<typeof insertOrderSchema>;
