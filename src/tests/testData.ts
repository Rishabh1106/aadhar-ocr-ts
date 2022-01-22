import { readFileSync } from "fs";

const imageToBuffer = (filePath: string) => {
  const testImage = readFileSync(filePath);
  const str = testImage.toString("base64");
  return Buffer.from(str, "base64");
};

export const testBufferAadhar1 = imageToBuffer("./test-images/my-aadhar.jpg");
export const testBufferAadhar2 = imageToBuffer("./test-images/monk.jpg");
export const testBufferAadhar3 = imageToBuffer("./test-images/radhey.jpg");
export const testBufferAadhar4 = imageToBuffer("./test-images/sallu.jpg");
export const testBufferPan1 = imageToBuffer("./test-images/my-pan.jpg");
export const testBufferPan2 = imageToBuffer("./test-images/pan-test2.jpg");
export const testBufferNonCard = imageToBuffer("./test-images/non-card.png");
export const textAadhar =
  "भारत सरकार\n" +
  "GOVERNMENT OF INDIA\n" +
  "ऋषभ नागर\n" +
  "Rishabh Nagar\n" +
  "जन्म तिथि/ DOB: 11/06/1999\n" +
  "पुरुष / MALE\n" +
  "9884 7598 2395\n" +
  "मेरा आधार, मेरी पहचान\n";

export const textPan =
  "आयकर विभाग\n" +
  "भारत सरकार\n" +
  "INCOME TAX DEPARTMENT\n" +
  "GOVT. OF INDIA\n" +
  "स्थायी लेखा संख्या कार्ड\n" +
  "Permanent ACcount Number Card\n" +
  "BOUPN5354P\n" +
  "नाम / Name\n" +
  "RISHABH NAGAR\n" +
  "पिता का नाम / Father's Name\n" +
  "BRIJ MOHAN NAGAR\n" +
  "जन्म की तारीख / Date of Birth\n" +
  "11/06/1999\n" +
  "Rishabh\n" +
  "Nagar.\n" +
  "हस्ताक्षर/Signature\n" +
  "12022018\n";

export const wrongText =
  "भारत सरकार\n" +
  "ऋषभ नागर\n" +
  "Rishabh Nagar\n" +
  "जन्म तिथि/ DOB: 11/06/1999\n" +
  "पुरुष / MALE\n" +
  "9884 7598 2395\n" +
  "मेरा आधार, मेरी पहचान\n";
