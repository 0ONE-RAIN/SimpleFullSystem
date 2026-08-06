import { DomainError } from "./domain.errors.js";

export class UserNotFoundError extends DomainError {
  readonly statusCode = 404;
  readonly errorCode = "USER_NOT_FOUND";

  constructor(id: string) {
    super(`User with ID ${id} was not found`);
  }
}
