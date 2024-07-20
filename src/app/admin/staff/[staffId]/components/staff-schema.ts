import { userRoleSchema } from "@/app/auth/components/user-schema";
import { z } from "zod";

export const staffFormSchema = z.object({
  email: z.string().email(),
  role: z.enum(userRoleSchema),
  displayName: z.string().min(3),
});

export type StaffFormSchema = z.infer<typeof staffFormSchema>;
