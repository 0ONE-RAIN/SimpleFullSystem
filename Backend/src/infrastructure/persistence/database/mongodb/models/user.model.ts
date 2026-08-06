import mongoose, { Schema, Document } from "mongoose";
import { Address } from "../../../../../domain/entities/User.entity.js";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  age?: number;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<Address>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: false,
    },
    addresses: {
      type: [AddressSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
