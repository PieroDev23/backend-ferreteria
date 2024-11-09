import { z } from "zod";

export const insertOrderSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  addressId: z.string().uuid().optional().nullable(),
  guestAddress: z.string().optional().nullable(),
  totalAmmount: z.number(),
  items: z
    .object({
      productId: z.string().uuid(),
      quantity: z.number(),
    })
    .array(),
});

export type InserOrderSchema = z.infer<typeof insertOrderSchema>;
