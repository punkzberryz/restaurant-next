import { db } from "@/lib/db";
import { cache } from "react";

export const fetchOrders = cache(async () => {
  const orders = await db.order.findMany({
    select: {
      totalPrice: true,
    },
  });

  return orders;
});
