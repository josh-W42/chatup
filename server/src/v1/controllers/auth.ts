import { Request, RequestHandler, Response } from "express";

const test = (req: Request, res: Response): void => {
  res.json({
    message: "Success",
  });
};

const login = (req: Request, res: Response): void => {
  res.json({
    message: "Not Implemented",
  });
};

export const handlers = {
  login,
  test,
};
