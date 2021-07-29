import { Request, Response } from "express";
import { db, Payload, RequestWithBody, User, uuid } from "../models";
import { getAllChats, handleError } from "../util/helper";

const createChat = (req: RequestWithBody, res: Response) => {};

export default { createChat };
