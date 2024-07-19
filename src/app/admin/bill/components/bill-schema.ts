import { Order } from "@prisma/client";
import { OrderFormSchema } from "../../order/components/order-schema";

export type Bill = Order & { foods: OrderFormSchema["foods"] } & {
  staff: {
    displayName: string;
    id: string;
  };
};
