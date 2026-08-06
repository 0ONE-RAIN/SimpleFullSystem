import { CreateUserDTO } from "../../dtos/createUserDTO.js";
import { User } from "../../../domain/entities/User.entity.js";
import { IUserRepository } from "../../../domain/repositories/IUser.repository.js";
import { UserAlreadyExistsError } from "../../../domain/errors/errorUserAlreadyExist.error.js";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const existUser = await this.userRepository.findByEmail(dto.email);
    if (existUser) {
      throw new UserAlreadyExistsError(dto.email);
    }

    const user = User.create(dto.name, dto.email, dto.addresses, dto.age);
    return this.userRepository.create(user);
  }
}
