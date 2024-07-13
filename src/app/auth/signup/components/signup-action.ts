"use server";

import { generateId } from "lucia";
import { signUpSchema, SignUpSchema } from "./form/signup-schema";
import { Argon2id } from "oslo/password";
import { db } from "@/lib/db";
import { BadRequestError } from "@/lib/error";
import { SignUpErrorResponse } from "./signup-error-response";
import { createSession } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const signupAction = async ({ data }: { data?: SignUpSchema }) => {
  try {
    //Validate data
    if (!data) {
      throw new BadRequestError();
    }
    const parseResult = signUpSchema.safeParse(data);
    if (!parseResult.success) {
      throw new BadRequestError();
    }

    const { password, email, displayName } = data;
    const hashedPassword = await new Argon2id().hash(password);
    const id = generateId(15);
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestError(SignUpErrorResponse.emailAlreadyExists);
    }
    const user = await db.user.create({
      data: {
        displayName,
        email,
        hashedPassword,
        id,
      },
    });
    const session = await createSession(user.id);
    return { user, session, error: null };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      user: null,
      session: null,
      error,
    };
  }
};
