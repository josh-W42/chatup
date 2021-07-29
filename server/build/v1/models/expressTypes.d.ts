import { Request } from "express";
export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}
export interface Payload {
    id: string;
    userName: string;
}
