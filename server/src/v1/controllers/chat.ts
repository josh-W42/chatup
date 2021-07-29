import { Request, Response } from "express";
import { db, Payload, RequestWithBody, User, uuid } from "../models";
import { getAllChats, handleError } from "../util/helper";

const createChat = (req: RequestWithBody, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return handleError(new Error("Invalid Chat Name"), 400, res);
  }

  try {
  } catch (error) {
    handleError(error, 500, res);
  }

  const user = req.user as User;
};

export default { createChat };
