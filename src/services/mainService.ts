require('dotenv').config();
import vision from '@google-cloud/vision';
import Jimp from 'jimp';
import { error } from 'console';
import { verifyCard } from './verifyCardService';
import { aadharConfigFunc } from '../card-config/aadhar-config';
import { panConfigFunc } from '../card-config/pan-config';
var _ = require('lodash')

interface opJSONBodyInterface {
    name : string,
    dob : string,
    aadharNo : string,
    panNo : string,
    gender  : string,
    photo : string
}

export const keyJSON = {
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

export const detectFaces = async (imageBuffer:Buffer) => {
    const request = { image: { content: imageBuffer } };
    const results = await client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    return faces;
}

export const funcJimp = async (x : number, y : number, w : number, h : number, imageBuffer : Buffer) => {
    const image = await Jimp.read(imageBuffer);
    if(!image){
        throw new error("Jimp can not able to read the image");
    }
    const imageBase64 = image.crop(x, y, w, h + 0.2 * h).getBase64Async(Jimp.MIME_PNG);
    return imageBase64;
}

export const main = async(inputBuffer : Buffer) => {
    
    const results = await client.textDetection({
        image: { content: inputBuffer }
      });
    const result = results[0].textAnnotations;
    
    const cardType = verifyCard(result[0].description);

    if(cardType=="aadhar"){
       return aadharConfigFunc(result[0].description,inputBuffer);
    }

    if(cardType=="pan"){
        return panConfigFunc(result[0].description,inputBuffer)
    }

}
