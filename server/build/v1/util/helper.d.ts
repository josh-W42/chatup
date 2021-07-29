import { Response } from "express";
import { Chat, Message } from "../models";
import { DataSnapshot } from "@firebase/database-types";
export declare const handleError: (err: Error, statusCode: number, res: Response) => void;
export declare const getAllChats: (userName: string) => Promise<Chat[]>;
export declare const getAllMessages: (id: string) => Promise<Message[]>;
export declare const toArray: <T>(snapshot: DataSnapshot) => T[];
