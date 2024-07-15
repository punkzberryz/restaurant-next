import { z } from "zod";
export const foodSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่ออาหาร" }),
});
export type FoodSchema = z.infer<typeof foodSchema>;
