import { Request } from "express";
import { uuid } from "./modelTypes";
export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}
export interface Payload {
    id: uuid;
    userName: string;
}
