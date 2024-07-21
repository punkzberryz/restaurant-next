import { clearSession, validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchRouteErrorHelper } from "@/lib/error/catch-route-error-helper";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { session, user } = await validateRequest();
    if (!session || !user) {
      throw new UnauthorizedError("invalid session");
    }
    await clearSession(session.id);
    return NextResponse.json({});
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/signout/query");
  }
};
