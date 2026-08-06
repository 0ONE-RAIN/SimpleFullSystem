import { User } from "../../domain/entities/User.entity.js";
import { UserNotFoundError } from "../../domain/errors/userNotFound.error.js";
import {
  AddressSearchCriteria,
  IUserRepository,
} from "../../domain/repositories/IUser.repository.js";
import { CreateUserDTO } from "../dtos/createUserDTO.js";
import { UpdateUserDTO } from "../dtos/updateUserDTO.js";
import { CreateUserUseCase } from "../useCases/userUseCase/createUserUseCase.js";
import { DeleteUserByIdUseCase } from "../useCases/userUseCase/deleteUserByIdUseCase.js";
import { GetAllUserUseCase } from "../useCases/userUseCase/getAllUserUseCase.js";
import { SearchByQueryAddressUseCase } from "../useCases/userUseCase/searchByQueryAddressUseCase.js";
import { SearchUserByIdUseCase } from "../useCases/userUseCase/searchUserByIdUseCase.js";
import { UpdateUserByIdUseCase } from "../useCases/userUseCase/updateUserByIdUseCase.js";

export class UserService {
  private searchUserByIdUseCase: SearchUserByIdUseCase;
  private createUserUseCase: CreateUserUseCase;
  private deleteByIdUseCase: DeleteUserByIdUseCase;
  private getAllUserUseCase: GetAllUserUseCase;
  private updateUserByIdUseCase: UpdateUserByIdUseCase;
  private searchByQueryAddressUseCase: SearchByQueryAddressUseCase;

  constructor(userRepository: IUserRepository) {
    this.searchByQueryAddressUseCase = new SearchByQueryAddressUseCase(userRepository);
    this.getAllUserUseCase = new GetAllUserUseCase(userRepository);
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.searchUserByIdUseCase = new SearchUserByIdUseCase(userRepository);
    this.updateUserByIdUseCase = new UpdateUserByIdUseCase(userRepository);
    this.deleteByIdUseCase = new DeleteUserByIdUseCase(userRepository);
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    return this.createUserUseCase.execute(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.searchUserByIdUseCase.execute(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    return this.deleteByIdUseCase.execute(id);
  }

  async getAllUser(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    return this.getAllUserUseCase.execute(page, limit);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    return this.updateUserByIdUseCase.execute(id, data);
  }

  async getUsersByQueryAddress(
    query: AddressSearchCriteria,
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }> {
    return this.searchByQueryAddressUseCase.execute(query, page, limit);
  }
}
