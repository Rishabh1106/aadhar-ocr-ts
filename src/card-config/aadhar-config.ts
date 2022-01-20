// the idea is to make the fields and rules to find.
// lets make an object which will have field and function need to run in order to find that field in text description.

import { extractFunction } from "../services/extractService";
import { photoExtraction } from "./generalFunctions";

const aadharConfig = {
    aadharNumber : (text:string)=>{
        const aadharno = text.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
        return aadharno[0];
    },
    dob : (text:string)=>{
        const dob =  text.match(/(\d){2}\/(\d{2})\/(\d{4})/);
        return dob[0];
    },
    gender : (text:string)=>{
        const gender = text.match(/(MALE|FEMALE|Male|Female)/)
        return gender[0];
    },
    aadharName : (text:string) => {
        const splitLines = str => str.split(/\r?\n/);
        const arr = splitLines(text)
        const idx = arr.findIndex((str)=> str.match(/(\d){2}\/(\d{2})\/(\d{4})/))
        console.log("Name : ",arr[idx-1]);
        return arr[idx-1];
    },
    photo : async (inputBuffer:Buffer)=>{
        const encoded = await photoExtraction(inputBuffer);
        return encoded;
    }
    
} 

export const aadharConfigFunc = (text:string,inputBuffer:Buffer) => {
    return extractFunction(aadharConfig,text,inputBuffer);
}