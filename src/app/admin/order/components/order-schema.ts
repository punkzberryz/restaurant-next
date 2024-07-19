import { z } from "zod";
import { unitOptionSchema } from "../../food/components/food-schema";
import { OrderStatus } from "@prisma/client";

export const OrderStatusOptions: { value: OrderStatus; label: string }[] = [
  {
    value: OrderStatus["PENDING"],
    label: "รอดำเนินการ",
  },
  {
    value: OrderStatus["DELIVERED"],
    label: "เสร็จสิ้น",
  },
  {
    value: OrderStatus["CANCELLED"],
    label: "ยกเลิก",
  },
  {
    value: OrderStatus["CONFIRMED"],
    label: "ชำระเงินแล้ว",
  },
] as const;

export const orderStatusLabels = new Map(
  OrderStatusOptions.map((u) => [u.value, u.label]),
);
export const orderStatusSchema: [OrderStatus, ...OrderStatus[]] = [
  OrderStatusOptions[0].value,
  ...OrderStatusOptions.slice(1).map((u) => u.value),
];

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
  foodQuantity: z.number(),
  status: z.enum(orderStatusSchema, { required_error: "กรุณาเลือกสถานะ" }),
});
export type OrderFormSchema = z.infer<typeof orderFormSchema>;
