import express from "express";
import multer from "multer";
import { apiController } from "../controllers/api_controller";
import { wrapperFunction } from "./wrapper_function";

const router = express.Router();

const uploadFile = (req, res, next) => {
  const upload = multer().single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
    } else if (err) {
      throw new Error(`Multer Error : ${err}`);
    }
    next();
  });
};

router.post("/", uploadFile, wrapperFunction(apiController));

export = router;
