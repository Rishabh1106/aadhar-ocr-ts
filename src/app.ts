import express from 'express';
const app = express();
import {reqResLogger} from "./logger/req_res_logger";

import {uploadFile, main, keyJSON} from './helper-functions';
import {errorResponder} from './middleware/errorMiddleware';
import {errorLoggerWinston} from './middleware/loggerMiddleware';
import { ValidationError } from './middleware/customErrorClass';

app.use(reqResLogger);

app.post('', uploadFile, async (req, res,next) => {
    try{
        if(Object.keys(req.body).length === 0){
            throw new ValidationError("Please give fields required",400);
        } else{
        const resJSON = await main(req.file.buffer,req.body);
        res.status(200).json(resJSON)
        }
    } catch(err){
        next(err);
    }
})


app.get('/test', async (req, res) => {
    //console.log(keyJSON)
    res.send("this is a test route to test the whether this is working on heroku")
})

app.use(errorLoggerWinston);
app.use(errorResponder);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running at port : ${port}`);
})