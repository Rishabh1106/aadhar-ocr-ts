import express from 'express';
const app = express();
import {reqResLogger} from "./logger/req_res_logger";
import vision from '@google-cloud/vision';


import {uploadFile,deleteImgFile, main} from './helper-functions';
import {errorResponder} from './middleware/errorMiddleware';
import {errorLoggerWinston} from './middleware/loggerMiddleware';
import { ValidationError } from './middleware/customErrorClass';

app.use(reqResLogger);

const keyJSON = {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
}

const client = new vision.ImageAnnotatorClient({
    credentials: keyJSON
});


app.post('', uploadFile, async (req, res,next) => {
    try{
        if(Object.keys(req.body).length === 0){
            throw new ValidationError("Please give fields required",400);
        } else{
        const resJSON = await main(req.file.buffer,req.body);
        console.log(resJSON);
        //deleteImgFile(); // deleting the file
        res.status(200).json(resJSON)
        }
    } catch(err){
        next(err);
    }
})

app.post('/test', uploadFile, async (req, res,next) => {
    console.log("Buffer :",req.file.buffer)
    const results = await client.textDetection({
        image: { content: req.file.buffer }
      });
      console.log(results[0].textAnnotations)
    res.send("this is a test route")
})

app.use(errorLoggerWinston);
app.use(errorResponder);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running at port : ${port}`);
})