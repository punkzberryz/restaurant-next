"use server";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { staffFormSchema, StaffFormSchema } from "./staff-schema";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditStaffErrorResponse } from "./edit-staff-error-response";
export const editStaffAction = async ({
  data,
  staffId,
}: {
  data: StaffFormSchema;
  staffId: string;
}) => {
  try {
    const result = staffFormSchema.safeParse(data);
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

    //validate new email is not used by other staff
    if (data.email !== staff.email) {
      const existedStaff = await db.user.findFirst({
        where: { email: data.email },
      });
      if (existedStaff) {
        throw new BadRequestError(EditStaffErrorResponse.emailAlreadyExists);
      }
    }

    const updatedStaff = await db.user.update({
      where: { id: staffId },
      data,
    });

    //Should we delete user session as well?

    return { staff: updatedStaff };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
