import { Response } from "express";
export declare const handleError: (err: Error, statusCode: number, res: Response) => void;
export declare const getAllChats: (userName: string) => Promise<never[]>;
