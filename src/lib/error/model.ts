export class UnauthorizedError extends Error {
  constructor(message = "Auth is required to access this page") {
    super(message);
    this.name = ErrorType.UnauthorizedError;
  }
}

export class InternalServerError extends Error {
  constructor(message = "Something went wrong") {
    super(message);
    this.name = ErrorType.InternalServerError;
  }
}

export class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.name = ErrorType.BadRequestError;
  }
}

enum ErrorType {
  UnauthorizedError = "UnauthorizedError",
  InternalServerError = "InternalServerError",
  BadRequestError = "BadRequestError",
}
