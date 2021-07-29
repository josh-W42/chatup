import { Response } from "express";
import { Chat, Message } from "../models";
export declare const handleError: (err: Error, statusCode: number, res: Response) => void;
export declare const getAllChats: (userName: string) => Promise<Chat[]>;
export declare const getAllMessages: (id: string) => Promise<Message[]>;
