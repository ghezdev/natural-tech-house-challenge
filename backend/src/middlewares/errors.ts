import { NextFunction, Request, Response } from "express";
import { HttpError } from "../classes/errors/http-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handled errors
  if (err instanceof HttpError) {
    const { statusCode, error, message } = err;

    console.error(message, JSON.stringify(error));
    return res.status(statusCode || 500).send({ message, context: error });
  }

  return res.status(500).send({ message: "Internal Server Error" });
};

