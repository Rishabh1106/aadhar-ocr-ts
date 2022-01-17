require('dotenv').config();
import vision from '@google-cloud/vision';
import Jimp from 'jimp';
import multer from 'multer'
import { error } from 'console';
import { unlink } from 'fs';
var _ = require('lodash');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    },
    filename: function (req, file, cb) {
        cb(null, 'input.jpg')
    }
})

export const uploadFile= (req, res, next) => {
    const upload =  multer().single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        } else if (err) {
            throw new Error(`Multer Error : ${err}`);
        }
        next()
    })
}

interface opJSONBodyInterface {
    name : string,
    dob : string,
    aadharNo : string,
    gender  : string,
    photo : string
}

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

export const main = async(inputBuffer : Buffer, requestBody : opJSONBodyInterface) => {

    const opJSON : opJSONBodyInterface = {
        name : null,
        dob : null,
        aadharNo : null,
        gender  : null,
        photo : null
    }
    const results = await client.textDetection({
        image: { content: inputBuffer }
      });
    const result = results[0].textAnnotations;
    
    if(requestBody.aadharNo=='true'){
        const aadharNo = result[0].description.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
        opJSON.aadharNo = aadharNo[0];
    }
    if(requestBody.dob=='true'){
        const dob = result[0].description.match(/(\d){2}\/(\d{2})\/(\d{4})/);
        opJSON.dob = dob[0];
    }
    if(requestBody.gender=='true'){
        const gender = result[0].description.match(/(MALE|FEMALE|Male|Female)/)
        opJSON.gender = gender[0];
    }

    if(requestBody.name=='true'){
        const names = result[0].description.match(/([A-Z])([a-z])+/g)
        _.remove(names, function (n:string) { return n === "Government" || n === "India" || n === "Date" || n === "Birth" || n === "Male" || n === "Female"; });
        opJSON.name = _.join(names, ' ');
    }

    if(requestBody.photo=='true'){
        const faces = await detectFaces(inputBuffer);
        const x0 = faces[0].boundingPoly.vertices[0].x;
        const y0 = faces[0].boundingPoly.vertices[0].y;
        const x2 = faces[0].boundingPoly.vertices[2].x;
        const y2 = faces[0].boundingPoly.vertices[2].y;
        const encoded = await funcJimp(x0, y0, x2 - x0, y2 - y0, inputBuffer);
        opJSON.photo = encoded;
    }
    Object.keys(opJSON).forEach((k) => opJSON[k] == null && delete opJSON[k]);
    return opJSON;
}
