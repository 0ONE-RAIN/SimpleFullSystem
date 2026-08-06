import { Response, Request, ErrorRequestHandler, NextFunction } from "express";
import { z } from "zod";
import { DomainError } from "../../../domain/errors/domain.errors.js";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.errorCode,
      message: err.message,
    });
    return;
  }

  console.error("[Unhandled Error]:", err);

  res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred on the server",
  });
};
