import { User } from "../../domain/entities/User.entity.js";
import {
  AddressResponseDTO,
  UserResponseDTO,
} from "../dtos/userResponseDTO.js";

const toAddressResponse = (address: {
  street: string;
  city: string;
  country: string;
  zip_code: string;
}): AddressResponseDTO => {
  return {
    calle: address.street,
    ciudad: address.city,
    pais: address.country,
    codigo_postal: address.zip_code,
  };
};

const toUserResponse = (user: User): UserResponseDTO => {
  return {
    id: user.id as string,
    nombre: user.name,
    email: user.email,
    edad: user.age,
    fecha_creacion: user.createdAt?.toISOString().replace("T", " ").substring(0, 19),
    direcciones: user.addresses.map(toAddressResponse),
  };
};

export const UserMapper = {
  toResponse: toUserResponse,
};
