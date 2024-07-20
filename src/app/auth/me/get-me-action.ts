"use server";

import { validateRequest } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const getMeAction = async () => {
  try {
    const { user } = await validateRequest();
    return { user };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
