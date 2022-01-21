import { Request, NextFunction, Response } from "express";

export const wrapperFunction = (func) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};
