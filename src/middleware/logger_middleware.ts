import { Request, NextFunction, Response } from "express";
import Logger from "../logger/logger";
import { handleError } from "./custom_error_class";

export const errorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  Logger.error(
    `Error Status Code : ${err.statusCode || 500} - Message :  ${
      err.message
    } - URL : ${req.originalUrl} - Method : ${
      req.method
    } - Body : ${JSON.stringify(req.body)} - IP : ${req.ip}`
  );
  handleError(err, res);
};
