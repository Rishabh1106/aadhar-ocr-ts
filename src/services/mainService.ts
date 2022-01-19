require('dotenv').config();
import vision from '@google-cloud/vision';
import Jimp from 'jimp';
import { error } from 'console';
import { verifyCard } from './verifyCardService';
import { extractAadharName, extractAadharNo, extractDOB, extractGender, extractPanNo } from './extractFieldsService';
import { aadharConfigFunc } from '../card-config/aadhar-config';
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
    const opJSON : opJSONBodyInterface = {
        name : null,
        dob : null,
        aadharNo : null,
        panNo : null,
        gender  : null,
        photo : null
    }
    const results = await client.textDetection({
        image: { content: inputBuffer }
      });
    const result = results[0].textAnnotations;

    // verify-card-type // return aadhar,pan,other
    
    const cardType = verifyCard(result[0].description);
    if(cardType=="aadhar"){

            aadharConfigFunc(result[0].description);
            opJSON.aadharNo = extractAadharNo(result[0].description);
            opJSON.name = extractAadharName(result[0].description);

            // how I will call that here
            // I have 2 files config and final extractor
            // let's call the config file from here and from config file call the extractor
    }

    if(cardType=="pan"){
            opJSON.panNo = extractPanNo(result[0].description);
        }
    
    opJSON.dob = extractDOB(result[0].description)
    opJSON.gender = extractGender(result[0].description);
    

    const faces = await detectFaces(inputBuffer);
    const x0 = faces[0].boundingPoly.vertices[0].x;
    const y0 = faces[0].boundingPoly.vertices[0].y;
    const x2 = faces[0].boundingPoly.vertices[2].x;
    const y2 = faces[0].boundingPoly.vertices[2].y;
    const encoded = await funcJimp(x0, y0, x2 - x0, y2 - y0, inputBuffer);
    opJSON.photo = encoded;
    
    Object.keys(opJSON).forEach((k) => opJSON[k] == null && delete opJSON[k]);
    return opJSON;
}
