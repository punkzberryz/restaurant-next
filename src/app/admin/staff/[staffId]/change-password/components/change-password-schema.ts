import { z } from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
  confirmPassword: z.string(),
});
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
