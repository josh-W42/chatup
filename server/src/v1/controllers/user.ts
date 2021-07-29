import { Request, Response } from "express";
import { User } from "../models";
import { getAllChats, handleError } from "../util/helper";

const test = (req: Request, res: Response) => {
  res.json({
    message: "success",
  });
};

const getUser = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    // get all chats and add them to the returned JSON
    const chats = await getAllChats(user.userName);

    res.json({
      user: { ...user, chats, password: "" },
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

export default { test, getUser };
