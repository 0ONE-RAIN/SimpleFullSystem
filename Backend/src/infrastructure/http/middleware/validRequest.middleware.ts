import { Request, NextFunction, Response } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
