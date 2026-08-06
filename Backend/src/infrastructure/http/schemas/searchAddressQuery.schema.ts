import { z } from "zod";
import { paginationQuerySchema } from "./paginationQuery.schema.js";

export const searchQueryAddressQuerySchema = paginationQuerySchema
  .extend({
    calle: z.string().trim().optional(),
    ciudad: z.string().trim().optional(),
    pais: z.string().trim().optional(),
    codigo_postal: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      const { page, limit, ...filters } = data;
      return Object.values(filters).some((value) => value !== undefined);
    },
    {
      message:
        "Debe proporcionar al menos un parámetro de búsqueda (calle, ciudad, pais o codigo_postal)",
      path: ["ciudad"],
    },
  )
  .transform((data) => ({
    page: data.page,
    limit: data.limit,
    ...(data.calle !== undefined && { street: data.calle }),
    ...(data.ciudad !== undefined && { city: data.ciudad }),
    ...(data.pais !== undefined && { country: data.pais }),
    ...(data.codigo_postal !== undefined && { zipCode: data.codigo_postal }),
  }));

export type SearchAddressQueryDTO = z.output<typeof searchQueryAddressQuerySchema>;
