import { Request } from "express";
import { uuid } from "./modelTypes";

// created an interface to fix the type values inside
// of request that has a body
export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// For JWT payloads
export interface Payload {
  id: uuid;
  userName: string;
}
