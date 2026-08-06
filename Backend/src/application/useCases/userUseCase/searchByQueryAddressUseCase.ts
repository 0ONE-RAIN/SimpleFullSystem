import { User } from "../../../domain/entities/User.entity.js";
import {
  AddressSearchCriteria,
  IUserRepository,
} from "../../../domain/repositories/IUser.repository.js";

export class SearchByQueryAddressUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    criterias: AddressSearchCriteria,
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }> {
    return this.userRepository.findByAddress(criterias, page, limit);
  }
}
