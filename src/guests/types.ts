import { z } from "zod";

export const insertGuestsSchema = z.object({
  lastname: z.string(),
  firstname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  country: z.string(),
  city: z.string(),
});

export type InsertGuestsSchema = z.infer<typeof insertGuestsSchema>;
