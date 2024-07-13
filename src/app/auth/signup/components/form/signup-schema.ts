import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(3),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
