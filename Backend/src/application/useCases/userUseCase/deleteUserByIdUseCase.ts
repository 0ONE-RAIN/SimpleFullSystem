import { IUserRepository } from "../../../domain/repositories/IUser.repository.js";
import { UserNotFoundError } from "../../../domain/errors/userNotFound.error.js";

export class DeleteUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const isDeleted = await this.userRepository.delete(id);
    if (!isDeleted) {
      throw new UserNotFoundError(id);
    }
    return isDeleted;
  }
}
