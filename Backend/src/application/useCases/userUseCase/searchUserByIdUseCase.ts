import { User } from "../../../domain/entities/User.entity.js";
import { IUserRepository } from "../../../domain/repositories/IUser.repository.js";

export class SearchUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
