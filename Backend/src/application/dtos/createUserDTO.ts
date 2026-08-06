import { Address } from "../../domain/entities/User.entity.js";

export interface CreateUserDTO {
  name: string;
  email: string;
  age?: number;
  addresses: Address[];
}
