import _ from "lodash";
import { photoExtraction } from "./generalFunctions";

export const panConfig = {
  panNumber: (text: string) => {
    const aadharno = text.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
    return _.first(aadharno);
  },
  dob: (text: string) => {
    const dob = text.match(/(\d){2}\/(\d{2})\/(\d{4})/);
    return _.first(dob);
  },
  panName: (text: string) => {
    const splitLines = (str) => str.split(/\r?\n/);
    const arr = splitLines(text);
    const idx = arr.findIndex((str) => str.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/));
    return arr[idx + 2];
  },
  panFatherName: (text: string) => {
    const splitLines = (str) => str.split(/\r?\n/);
    const arr = splitLines(text);
    const idx = arr.findIndex((str) => str.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/));
    return arr[idx + 4];
  },
  photo: async (inputBuffer: Buffer) => {
    const encoded = await photoExtraction(inputBuffer);
    return encoded;
  },
};
