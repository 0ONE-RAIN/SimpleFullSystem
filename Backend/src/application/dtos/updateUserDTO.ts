import { Address } from "../../domain/entities/User.entity.js";

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  age?: number;
  addresses?: Address[];
}
