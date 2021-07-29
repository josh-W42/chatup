import { Request } from "express";
import { Message } from "./modelTypes";

// created an interface to fix the type values inside
// of request that has a body
export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// For JWT payloads
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
