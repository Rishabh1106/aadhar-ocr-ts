import { Request, NextFunction, Response } from "express";
import Logger from "../logger/logger";

export const errorLoggerWinston = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error(
    `Error Status Code : ${err.status || 500} - Message :  ${
      err.message
    } - URL : ${req.originalUrl} - Method : ${
      req.method
    } - Body : ${JSON.stringify(req.body)} - IP : ${req.ip}`
  );
  next(err);
};
