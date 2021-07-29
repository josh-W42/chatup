import { Request, Response, NextFunction } from "express";
declare const isGettingOwnData: (req: Request, res: Response, next: NextFunction) => void;
export default isGettingOwnData;
