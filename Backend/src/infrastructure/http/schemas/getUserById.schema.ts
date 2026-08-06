import { z } from "zod";

export const getUserByIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ObjectId"),
})

