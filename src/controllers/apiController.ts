import { ValidationError } from "../middleware/customErrorClass";
import { main } from "../services/mainService";

export const apiController = async (req, res) => {
  if (!req.file) {
    throw new ValidationError("Please provide a file", 401);
  }
  const resJSON = await main(req.file.buffer);
  res.status(200).json(resJSON);
};
