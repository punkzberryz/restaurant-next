import { z } from "zod";
import { Category, Food, FoodUnit, Image } from "@prisma/client";

export const unitOptions: { value: FoodUnit; label: string }[] = [
  {
    value: FoodUnit["PLATE"],
    label: "จาน",
  },
  {
    value: FoodUnit["BOWL"],
    label: "ถ้วย",
  },
  {
    value: FoodUnit["PIECE"],
    label: "ชิ้น",
  },
  {
    value: FoodUnit["KG"],
    label: "กก.",
  },
  {
    value: FoodUnit["CUP"],
    label: "แก้ว",
  },
  {
    value: FoodUnit["BOTTLE"],
    label: "ขวด",
  },
] as const;

export const unitLabels = new Map(unitOptions.map((u) => [u.value, u.label]));
type UnitOption = (typeof unitOptions)[number]["value"];
export const unitOptionSchema: [UnitOption, ...UnitOption[]] = [
  unitOptions[0].value,
  ...unitOptions.slice(1).map((u) => u.value),
];

export const foodSchema = z.object({
  categoryId: z.number({ required_error: "กรุณาเลือกหมวดหมู่อาหาร" }),
  name: z.string().min(1, { message: "กรุณากรอกชื่ออาหาร" }),
  price: z.number().min(1, { message: "กรุณากรอกราคาอาหาร" }),
  unit: z.enum(unitOptionSchema, { required_error: "กรุณาเลือกหน่วย" }),
  description: z.string().optional(),
  images: z.object({ url: z.string() }).array(),
});
export type FoodSchema = z.infer<typeof foodSchema>;

export type FoodWithImagesAndCategory = Food & { images: Image[] } & {
  category: Category;
};
