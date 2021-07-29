import { Request } from "express";
import { Message } from "./modelTypes";
export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}
export interface Payload {
    id: string;
    userName: string;
}
export interface NewContentPayload {
    message: Message;
    chatId: string;
}
export interface JoinLeavePayload {
    id: string;
}
