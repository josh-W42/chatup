import { Request, Response, NextFunction } from "express";
import { User } from "../models";

const isGettingOwnData = (req: Request, res: Response, next: NextFunction) => {
  const user: User | undefined = req.user as User;
  const { userName } = req.params;

  if (user && user.userName === userName) {
    next();
    return;
  }

  res.status(403).json({
    message: "Must Be Logged In As That User To Do That",
  });
};

export default isGettingOwnData;
