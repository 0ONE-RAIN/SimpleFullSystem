import { User } from "../../../domain/entities/User.entity.js";
import { UserNotFoundError } from "../../../domain/errors/userNotFound.error.js";
import { UserAlreadyExistsError } from "../../../domain/errors/errorUserAlreadyExist.error.js";
import { UpdateUserDTO } from "../../dtos/updateUserDTO.js";
import { IUserRepository } from "../../../domain/repositories/IUser.repository.js";

export class UpdateUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await this.userRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new UserAlreadyExistsError(existingEmail.email);
      }
    }

    user.updateDetails({
      name: data.name,
      email: data.email,
      age: data.age,
      addresses: data.addresses,
    });

    const userUpdated = await this.userRepository.update(id, user);
    return userUpdated as User;
  }
}
