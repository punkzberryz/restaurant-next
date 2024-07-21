"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "./change-password-schema";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
// import { Argon2id } from "oslo/password";
import bcrypt from "bcryptjs";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export const changeUserPasswordAction = async ({
  data,
  staffId,
}: {
  data: ChangePasswordSchema;
  staffId: string;
}) => {
  try {
    const result = changePasswordSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError();
    }
    const userReq = validateRequest();
    const staffReq = db.user.findUnique({ where: { id: staffId } });
    const [{ user }, staff] = await Promise.all([userReq, staffReq]);
    if (!user) {
      throw new UnauthorizedError();
    }
    if (!staff) {
      throw new BadRequestError();
    }
    if (user.role !== "ADMIN" || staff.id !== user.id) {
      throw new UnauthorizedError();
    }

    // const hashedPassword = await new Argon2id().hash(data.password);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const updatedStaff = await db.user.update({
      where: { id: staffId },
      data: {
        hashedPassword,
      },
    });
    return { staff: updatedStaff };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
