import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateQuery = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.locals.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};
