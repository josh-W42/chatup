import { Response } from "express";
import { RequestWithBody } from "../models";
declare const createChat: (req: RequestWithBody, res: Response) => void;
export { createChat };
