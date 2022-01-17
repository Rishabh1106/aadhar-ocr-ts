import express from 'express';
const app = express();
import {reqResLogger} from "./logger/req_res_logger";

import {uploadFile,deleteImgFile, main} from './helper-functions';
import {errorResponder} from './middleware/errorMiddleware';
import {errorLoggerWinston} from './middleware/loggerMiddleware';
import { ValidationError } from './middleware/customErrorClass';

app.use(reqResLogger);

app.post('', uploadFile, async (req, res,next) => {
    try{
        if(Object.keys(req.body).length === 0){
            console.log("test")
            throw new ValidationError("Please give fields required",400);
        } else{
        const resJSON = await main('./input.jpg',req.body);
        deleteImgFile(); // deleting the file
        res.status(200).json(resJSON)
        }
    } catch(err){
        next(err);
    }
})

app.post('/test', uploadFile, async (req, res,next) => {
    res.send("this is a test route")
})

app.use(errorLoggerWinston);
app.use(errorResponder);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running at port : ${port}`);
})