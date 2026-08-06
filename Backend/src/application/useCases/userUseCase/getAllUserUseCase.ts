import { User } from "../../../domain/entities/User.entity.js";
import { IUserRepository } from "../../../domain/repositories/IUser.repository.js";

export class GetAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    return this.userRepository.findAll(page, limit);
  }
}
