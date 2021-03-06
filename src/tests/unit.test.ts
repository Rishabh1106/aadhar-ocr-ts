import { cardVerifyConfig } from "../card_config/card_verify_config";
import { main } from "../services/main_service";
import { verifyCard } from "../services/verify_card_service";
import { extractFunction } from "../services/extract_service";
import {
  testBufferAadhar1,
  testBufferAadhar2,
  testBufferAadhar3,
  testBufferAadhar4,
  testBufferNonCard,
  testBufferPan1,
  testBufferPan2,
  textAadhar,
  textPan,
  wrongText,
} from "./testData";
import { aadharConfig } from "../card_config/aadhar_config";
import { panConfig } from "../card_config/pan_config";

test("Should run the main function successfully for aadhar", async () => {
  const op = await main(testBufferAadhar1);
  expect(op.aadharName).toBe("Rishabh Nagar");
});

test("Should run the main function successfully for aadhar", async () => {
  const op = await main(testBufferAadhar2);
  expect(op.aadharName).toBe("Mayank");
});

test("Should run the main function successfully for aadhar", async () => {
  const op = await main(testBufferAadhar3);
  expect(op.aadharName).toBe("Bhumika Nagar");
});

test("Should run the main function successfully for aadhar", async () => {
  const op = await main(testBufferAadhar4);
  expect(op.aadharName).toBe("Sanjana Khandelwal");
});

test("Should run the main funtion successfully for PAN", async () => {
  const op = await main(testBufferPan1);
  expect(op.panName).toBe("RISHABH NAGAR");
});

test("Should run the main funtion successfully for PAN", async () => {
  const op = await main(testBufferPan2);
  expect(op.panName).toBe("KOCHERLA SRIKANTH");
});

test("Should run the main funtion unsuccessfully for non-card image buffer", async () => {
  try {
    const op = await main(testBufferNonCard);
  } catch (error) {
    var thrownError = error;
  }
  expect(thrownError.message).toBe("Card type can not be detected");
});

test("verify card should be run successfully for aadhar", () => {
  expect(verifyCard(textAadhar, cardVerifyConfig)).toBe("aadhar");
});

test("verify card should be run successfully for pan", () => {
  expect(verifyCard(textPan, cardVerifyConfig)).toBe("pan");
});

test("verify card should return false for wrong test data", () => {
  expect(verifyCard(wrongText, cardVerifyConfig)).toBe(false);
});

test("extractin function should run successfully for aadhar", async () => {
  const opJson = await extractFunction(
    aadharConfig,
    textAadhar,
    testBufferAadhar1
  );
  expect(opJson.aadharName).toBe("Rishabh Nagar");
});

test("extractin function should run successfully for pan", async () => {
  const opJson = await extractFunction(panConfig, textPan, testBufferPan1);
  expect(opJson.panName).toBe("RISHABH NAGAR");
});

test("extractin function should run successfully for pan", async () => {
  const opJson = await extractFunction({}, textPan, testBufferPan1);
  expect(opJson).toEqual({});
});
