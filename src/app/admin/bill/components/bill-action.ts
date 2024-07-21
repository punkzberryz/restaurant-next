"use server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

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
