import { z } from "zod";

export interface Product {
  codigo: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  creacion: string;
}

export type SortBy = "cantidad" | "creacion" | "codigo" | "nombre";

export const productSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  descripcion: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  cantidad: z
    .number({ message: "La cantidad es obligatoria" })
    .int("La cantidad debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
