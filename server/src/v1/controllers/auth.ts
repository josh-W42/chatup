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

  console.log(userName, password);
  try {
    // check if username exists
    if (db.users.has(userName)) throw new Error("Username is taken!");

    // if not, create new entry
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export default {
  login,
  test,
  signUp,
};
