import { z } from "zod";
export const categorySchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อหมวดหมู่อาหาร" }),
});
export type CategorySchema = z.infer<typeof categorySchema>;
