import { z } from "zod";

export const addressSchema = z.object({
  calle: z.string("El campo calle es requerido").min(1, "El campo calle es requerido"),
  ciudad: z.string("El campo ciudad es requerido").min(1, "El campo ciudad es requerido"),
  pais: z.string("El campo pais es requerido").min(1, "El campo pais es requerido"),
  codigo_postal: z
    .string("El campo codigo_postal es requerido")
    .min(1, "El campo codigo_postal es requerido"),
});

export const createUserSchema = z
  .object({
    nombre: z.string("El campo nombre es requerido").min(1, "El campo nombre es requerido"),
    email: z.email("Email inválido"),
    edad: z
      .number("La edad debe ser un número")
      .int("La edad debe ser un número entero")
      .min(0, "La edad no puede ser negativa")
      .optional(),
    direcciones: z
      .array(addressSchema)
      .min(1, "Debe incluir al menos una dirección"),
  })
  .transform((data) => ({
    name: data.nombre,
    email: data.email,
    age: data.edad,
    addresses: data.direcciones.map((d) => ({
      street: d.calle,
      city: d.ciudad,
      country: d.pais,
      zip_code: d.codigo_postal,
    })),
  }));
