"use server";

import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { orderFormSchema, OrderFormSchema } from "./order-schema";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export const createOrderAction = async ({
  data,
}: {
  data: OrderFormSchema;
}) => {
  try {
    //validate data
    const result = orderFormSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError();
    }
    //create order
    const order = await db.order.create({
      data: {
        ...data,
        staffId: user.id,
        foods: JSON.stringify(data.foods),
      },
    });
    return { order };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
export const getManyOrdersAction = async ({
  limit,
  pageId,
}: {
  pageId: number;
  limit: number;
}) => {
  try {
    //validate body
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError();
    }
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: (pageId - 1) * limit,
    });
    return { orders };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
