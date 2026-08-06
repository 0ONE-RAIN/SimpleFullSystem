import { Response, NextFunction, Request } from "express";
import { z } from "zod";

export const validateParams = (schema: z.ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req.params = (await schema.parseAsync(req.params)) as typeof req.params;
      next();
    } catch (err) {
      next(err);
    }
  };
};
