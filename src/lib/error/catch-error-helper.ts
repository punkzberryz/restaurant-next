import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "./model";

export enum ErrorType {
  Unauthorized = "UnauthorizedError",
  BadRequest = "BadRequestError",
  Internal = "InternalServerError",
  Error = "Error",
  Unknown = "Unknown",
}

export const catchErrorTypeChecker = (
  err: unknown,
): { type: ErrorType; message: string } => {
  if (err instanceof UnauthorizedError) {
    return { type: ErrorType.Unauthorized, message: err.message };
  }
  if (err instanceof BadRequestError) {
    return { type: ErrorType.BadRequest, message: err.message };
  }
  if (err instanceof InternalServerError) {
    return { type: ErrorType.Internal, message: err.message };
  }
  if (err instanceof Error) {
    return { type: ErrorType.Error, message: err.message };
  }
  if (typeof err === "string") {
    return { type: ErrorType.Error, message: err };
  }
  //unknown error
  return { type: ErrorType.Unknown, message: "Unknown error" };
};

export const catchErrorHelper = (functionaName: string, err: unknown) => {
  if (err instanceof UnauthorizedError) {
    console.error(`[UNAUTH_ERROR ${functionaName}] ${err.message}`);
    throw err;
  }
  if (err instanceof BadRequestError) {
    console.error(`[BADREQ_ERROR ${functionaName}] ${err.message}`);
    throw err;
  }
  if (err instanceof InternalServerError) {
    console.error(`[INTERNAL_ERROR ${functionaName}] ${err.message}`);
    throw err;
  }
  if (err instanceof Error) {
    console.error(`[ERROR ${functionaName}] ${err.message}`);
    throw err;
  }
  console.error(`[ERROR ${functionaName}] ${err}`);
  throw new Error(`[ERROR ${functionaName}] ${err}`);
};

export const catchErrorFromServerActionOnClientHelper = (err: {
  message: string;
  code: number;
}) => {
  if (err.code === 401) {
    throw new UnauthorizedError(err.message);
  }
  if (err.code === 400) {
    throw new BadRequestError(err.message);
  }
  if (err.code === 500) {
    throw new InternalServerError(err.message);
  }
  throw new Error(err.message);
};

export const responseErrorHelper = (statusCode: number, message?: string) => {
  if (statusCode === 401) {
    throw new UnauthorizedError(message);
  }
  if (statusCode === 400) {
    throw new BadRequestError(message);
  }
  throw new InternalServerError(message);
};
