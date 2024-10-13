import { z } from "zod";

export const userInsertSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export type UserInsertSchema = z.infer<typeof userInsertSchema>;
