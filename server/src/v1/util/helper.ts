import { Response } from "express";

export const handleError = (
  err: Error,
  statusCode: number,
  res: Response
): void => {
  console.error(err);
  res.status(statusCode).json({
    message: err.message,
  });
};
