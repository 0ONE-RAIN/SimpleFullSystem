import { User } from "../entities/User.entity.js";

export type AddressSearchCriteria = {
  street?: string;
  country?: string;
  city?: string;
  zipCode?: string;
};

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(page: number, limit: number): Promise<{ users: User[]; total: number }>;
  update(id: string, userData: User): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findByAddress(
    criterias: AddressSearchCriteria,
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }>;
}
