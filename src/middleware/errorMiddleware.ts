import { Request, Response } from "express";
import { handleError } from "./customErrorClass";

export const errorResponder = (err, req: Request, res: Response) => {
  if (err.code === "ENOENT") {
    const msg = `file is not uploaded`;
    res.status(500).send(msg);
  }
  handleError(err, res);
};
