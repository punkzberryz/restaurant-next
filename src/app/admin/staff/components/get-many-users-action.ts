"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const getManyUsersAction = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  try {
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //fetch data
    const users = await db.user.findMany({
      take: limit,
      skip: (pageId - 1) * limit,
      orderBy: {
        id: "desc",
      },
    });
    return { users, hasMore: users.length === limit };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
