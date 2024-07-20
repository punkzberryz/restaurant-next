"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { DeleteStaffErrorResponse } from "./delete-staff-error-response";

export const deleteStaffAction = async ({ staffId }: { staffId: string }) => {
  try {
    if (!staffId) throw new BadRequestError();
    const { user } = await validateRequest();
    if (!user) throw new UnauthorizedError();
    if (user.id === staffId)
      throw new BadRequestError(DeleteStaffErrorResponse.deleteSelfNotAllowed);
    const staff = await db.user.findUnique({ where: { id: staffId } });
    if (!staff) throw new BadRequestError();

    await db.user.delete({ where: { id: staffId } });

    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
