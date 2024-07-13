"use server";

import { clearSession, validateRequest } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const signoutAction = async () => {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return {
        error: { message: "Session not found", code: 401 },
      };
    }
    await clearSession(session.id);
    return {
      error: null,
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
