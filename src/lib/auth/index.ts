import { Lucia } from "lucia";
import { dbAdapter } from "../db";
import { COOKIE_NAME } from "../config";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
export * from "./oauth-setup";

export const lucia = new Lucia(dbAdapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    name: COOKIE_NAME,
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      displayName: attributes.displayName,
      email: attributes.email,
      //   githubId: attributes.githubId,
      role: attributes.role,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return session;
};

export const clearSession = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const getSessionId = () => {
  return cookies().get(lucia.sessionCookieName)?.value;
};

export const validateRequest = cache(async (sessionIdFromAuth?: string) => {
  let sessionId = getSessionId() ?? null;
  if (sessionIdFromAuth) {
    sessionId = sessionIdFromAuth;
  }
  console.log(`[validateRequest] sessionId: ${sessionId}`);
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (err) {
    console.error(`[ERROR - validateRequest] `, err);
  }
  return result;
});
