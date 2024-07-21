import { BadRequestError } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "../components/form/signup-schema";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { db } from "@/lib/db";
import { SignUpErrorResponse } from "../components/signup-error-response";
import { createSession } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const parse = signUpSchema.safeParse(data);
    if (!parse.success) {
      throw new BadRequestError();
    }
    const { password, email, displayName } = data;
    const hashedPassword = await new Argon2id().hash(password);
    const id = generateId(15);
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw new BadRequestError(SignUpErrorResponse.emailAlreadyExists);
    const user = await db.user.create({
      data: { displayName, email, hashedPassword, id },
    });
    const session = await createSession(user.id);
    return NextResponse.json({ user, session, error: null });
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return NextResponse.json({ user: null, session: null, error });
  }
}
