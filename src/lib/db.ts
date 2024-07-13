import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
declare global {
  var prisma: PrismaClient | undefined;
}

// Without this, during development when we perform hot-reload many prisma clients will
// be created and it will slow down the development server.
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export const dbAdapter = new PrismaAdapter(db.session, db.user);
export enum PrismaClientErrorCode {
  UniqueConstraintViolation = "P2002",
  ForeignKeyConstraintViolation = "P2003",
  RecordDoesNotExist = "P2025",
}
