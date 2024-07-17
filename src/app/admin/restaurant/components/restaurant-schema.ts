import { z } from "zod";

const phoneRegex = new RegExp(
  /^0[0-9]{1,2}-[0-9]{3}-[0-9]{4}$|^0[0-9]{1,2}[0-9]{3}[0-9]{4}$/,
);

export const restaurantFormSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อร้านอาหาร" }),
  description: z.string(),
  address: z.string().min(1, { message: "กรุณากรอกที่อยู่" }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "เบอร์โทรศัพท์ไม่ถูกต้อง" })
    .min(8, { message: "เบอร์โทรศัพท์ไม่ถูกต้อง" }),
  logoImageUrl: z.string().min(2, { message: "กรุณาอัพโหลดรูปภาพ" }),
});
export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
