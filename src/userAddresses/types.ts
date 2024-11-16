import { z } from "zod";

export const insertUserAddressSchema = z.object({
  userId: z.string().uuid(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),
  city: z.string(),
});

export type InsertUserAddressSchema = z.infer<typeof insertUserAddressSchema>;
