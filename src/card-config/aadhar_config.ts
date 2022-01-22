import { photoExtraction } from "./general_functions";
import _ from "lodash";

export const aadharConfig = {
  aadharNumber: (text: string) => {
    const aadharno = text.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
    return _.first(aadharno);
  },
  dob: (text: string) => {
    const dob = text.match(/(\d){2}\/(\d{2})\/(\d{4})/);
    return _.first(dob);
  },
  gender: (text: string) => {
    const gender = text.match(/(MALE|FEMALE|Male|Female)/);
    return _.first(gender);
  },
  aadharName: (text: string) => {
    const splitLines = (str) => str.split(/\r?\n/);
    const arr = splitLines(text);
    const idx = arr.findIndex((str) => str.match(/(\d){2}\/(\d{2})\/(\d{4})/));
    return arr[idx - 1];
  },
  photo: async (inputBuffer: Buffer) => {
    const encoded = await photoExtraction(inputBuffer);
    return encoded;
  },
};
