import { z } from "zod";
import { unitOptionSchema } from "../../food/components/food-schema";

const foodSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  unit: z.enum(unitOptionSchema, { required_error: "กรุณาเลือกหน่วย" }),
  totalPrice: z.number(),
});
export const orderFormSchema = z.object({
  date: z.string(),
  foods: z
    .array(foodSchema)
    .min(1, { message: "กรุณาเลือกอย่างน้อย 1 รายการ" }),
  totalPrice: z.number(),
});
export type OrderFormSchema = z.infer<typeof orderFormSchema>;
