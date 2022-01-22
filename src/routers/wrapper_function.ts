import { Request, NextFunction, Response } from "express";

// wrapper function is used here as async wrap which catches the error and sendd to the next fuctions to handle
export const wrapperFunction = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};
