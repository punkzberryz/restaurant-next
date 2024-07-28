import { generateCodeVerifier, generateState } from "arctic";
import { line } from "@/lib/auth";
import { cookies } from "next/headers";
export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await line.createAuthorizationURL(state, codeVerifier, {
    scopes: [
      "profile",
      //  "email"
    ],
  });
  cookies().set("line_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("line_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  return Response.redirect(url);
}
