import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchRouteErrorHelper } from "@/lib/error/catch-route-error-helper";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { session, user } = await validateRequest();
    if (!session || !user) {
      throw new UnauthorizedError("invalid session");
    }
    return NextResponse.json({ user });
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/me");
  }
};
