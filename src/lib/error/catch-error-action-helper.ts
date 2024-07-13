import { PrismaClientErrorCode } from "../db";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "./model";

export const catchErrorForServerActionHelper = (err: unknown) => {
  const code = (err as any)?.code as string | undefined;
  if (code === PrismaClientErrorCode.UniqueConstraintViolation) {
    return {
      message: "Data already exists in the database",
      code: 400,
    };
  }

  if (err instanceof UnauthorizedError) {
    return {
      message: err.message,
      code: 401,
    };
    // throw err;
  }
  if (err instanceof BadRequestError) {
    return {
      message: err.message,
      code: 400,
    };
  }
  if (err instanceof InternalServerError) {
    return {
      message: err.message,
      code: 500,
    };
  }
  if (err instanceof Error) {
    return {
      message: err.message,
      code: 500,
    };
  }
  if (typeof err === "string") {
    return {
      message: err,
      code: 500,
    };
  }
  return {
    message: `Unknown error ${err}`,
    code: 500,
  };
};
