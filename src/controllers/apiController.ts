import { main } from "../services/mainService";

export const apiController = async (req, res, next) => {
  try {
    const resJSON = await main(req.file.buffer);
    res.status(200).json(resJSON);
  } catch (err) {
    next(err);
  }
};
