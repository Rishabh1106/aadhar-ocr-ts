import { ValidationError } from "../middleware/custom_error_class";
import { main } from "../services/main_service";

export const apiController = async (req, res) => {
  if (!req.file) {
    throw new ValidationError("Please provide a file", 401);
  }
  const resJSON = await main(req.file.buffer);
  res.status(200).json(resJSON);
};
