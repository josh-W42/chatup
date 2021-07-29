import { Response } from "express";
import { Chat } from "../models";
export declare const handleError: (err: Error, statusCode: number, res: Response) => void;
export declare const getAllChats: (userName: string) => Promise<Chat[]>;
