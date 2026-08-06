import { DomainError } from "./domain.errors.js";

export class UserAlreadyExistsError extends DomainError {
  readonly statusCode = 409;
  readonly errorCode = "USER_ALREADY_EXISTS";

  constructor(email: string) {
    super(`The email: ${email} is already registered`);
  }
}
