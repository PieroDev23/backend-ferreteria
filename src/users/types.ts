import { z } from "zod";

export const userInsertSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export const clientAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserInsertSchema = z.infer<typeof userInsertSchema>;
export type clientAuthSchema = z.infer<typeof clientAuthSchema>;
