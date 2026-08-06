import { User } from "../../domain/entities/User.entity.js";
import {
  AddressSearchCriteria,
  IUserRepository,
} from "../../domain/repositories/IUser.repository.js";
import {
  IUserDocument,
  UserModel,
} from "../persistence/database/mongodb/models/user.model.js";

export class UserRepository implements IUserRepository {
  private toDomain(userDoc: IUserDocument): User {
    return User.fromPrimitives({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      age: userDoc.age,
      addresses: userDoc.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        country: address.country,
        zip_code: address.zip_code,
      })),
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    });
  }

  async findByAddress(
    criterias: AddressSearchCriteria,
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }> {
    const query: Record<string, unknown> = {};
    const skip = (page - 1) * limit;

    if (criterias.street) query["addresses.street"] = new RegExp(this.escapeRegex(criterias.street), "i");
    if (criterias.city) query["addresses.city"] = new RegExp(this.escapeRegex(criterias.city), "i");
    if (criterias.country) query["addresses.country"] = new RegExp(this.escapeRegex(criterias.country), "i");
    if (criterias.zipCode) query["addresses.zip_code"] = new RegExp(this.escapeRegex(criterias.zipCode), "i");

    const [userDocs, total] = await Promise.all([
      UserModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      UserModel.countDocuments(query),
    ]);

    return {
      users: userDocs.map((doc) => this.toDomain(doc)),
      total,
    };
  }

  async create(user: User): Promise<User> {
    const userDoc = new UserModel({
      name: user.name,
      email: user.email,
      age: user.age,
      addresses: user.addresses,
    });
    const savedUser = await userDoc.save();
    return this.toDomain(savedUser);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    return userDoc ? this.toDomain(userDoc) : null;
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit;
    const [userDocs, total] = await Promise.all([
      UserModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      UserModel.countDocuments(),
    ]);

    return {
      users: userDocs.map((doc) => this.toDomain(doc)),
      total,
    };
  }

  async update(id: string, userData: User): Promise<User | null> {
    const userDoc = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: userData.name,
          email: userData.email,
          age: userData.age,
          addresses: userData.addresses,
        },
      },
      { returnDocument: "after" },
    );

    return userDoc ? this.toDomain(userDoc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const userDoc = await UserModel.findByIdAndDelete(id);
    return userDoc !== null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    return userDoc ? this.toDomain(userDoc) : null;
  }

  private escapeRegex(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
}
