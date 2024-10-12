import { z } from "zod";

export const userInserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export type UserInserSchema = z.infer<typeof userInserSchema>;
