/// <reference types="qs" />
import { Request, Response } from "express";
import { RequestWithBody } from "../models";
declare const _default: {
    login: (req: RequestWithBody, res: Response<any, Record<string, any>>) => Promise<void>;
    test: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void;
    signUp: (req: RequestWithBody, res: Response<any, Record<string, any>>) => Promise<void>;
};
export default _default;
