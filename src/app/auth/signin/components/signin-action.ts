"use server";

import { BadRequestError } from "@/lib/error";
import { signInSchema, SignInSchema } from "./form/signin-schema";
import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { SignInErrorResponse } from "./signin-error-response";
import { createSession } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const signinAction = async ({ data }: { data: SignInSchema }) => {
  try {
    const result = signInSchema.safeParse(data);
    if (result.error || !result.success) {
      throw new BadRequestError();
    }
    const { email, password } = data;
    //check user
    const user = await db.user.findUnique({
      where: { email },
    });
    const validPassword = await new Argon2id().verify(
      user?.hashedPassword ?? "nil",
      password,
    );
    if (!user || !validPassword) {
      throw new BadRequestError(SignInErrorResponse.passwordOrEmailIsNotMatch);
    }
    const session = await createSession(user.id);

    return { user, session, error: null };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    if (error.message === "password hash string missing field") {
      return {
        user: null,
        session: null,
        error: {
          message: String(SignInErrorResponse.passwordOrEmailIsNotMatch),
          code: 400,
        },
      };
    }

    return { error, user: null, session: null };
  }
};
