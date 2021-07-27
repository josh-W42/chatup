import { Request, Response } from "express";
import { db } from "../models";

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

const signUp = (req: Request, res: Response): void => {
  const { userName, password }: { userName: string; password: string } =
    req.body;

  try {
    // check if username exists
  } catch {}
};

export const handlers = {
  login,
  test,
  signUp,
};
