import { z } from "zod";
import { addressSchema } from "./createUser.schema.js";

export const updateUserSchema = z
  .object({
    nombre: z.string("El campo nombre es requerido").min(1).optional(),
    email: z.email("Email inválido").optional(),
    edad: z
      .number("La edad debe ser un número")
      .int("La edad debe ser un número entero")
      .min(0, "La edad no puede ser negativa")
      .optional(),
    direcciones: z.array(addressSchema).min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Al menos un campo debe ser proporcionado",
  })
  .transform((data) => ({
    ...(data.nombre !== undefined && { name: data.nombre }),
    ...(data.email !== undefined && { email: data.email }),
    ...(data.edad !== undefined && { age: data.edad }),
    ...(data.direcciones !== undefined && {
      addresses: data.direcciones.map((d) => ({
        street: d.calle,
        city: d.ciudad,
        country: d.pais,
        zip_code: d.codigo_postal,
      })),
    }),
  }));
