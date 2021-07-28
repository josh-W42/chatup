import { Response } from "express";

export const handleError = (
  err: Error,
  statusCode: number,
  res: Response
): void => {
  console.error(err.message);
  res.status(statusCode).json({
    message: err.message,
  });
};
