import { cardVerifyConfig } from "../card-config/card-verify-config";
import { main } from "../services/mainService";
import { verifyCard } from "../services/verifyCardService";
import {
  testBufferAadhar,
  testBufferNonCard,
  testBufferPan,
  textAadhar,
  textPan,
  wrongText,
} from "./testData";

test("Should run the main function successfully for aadhar", async () => {
  const op = await main(testBufferAadhar);
  if (!op) {
    expect(op).toBe(null);
  }
  expect(op.aadharName).toBe("Rishabh Nagar");
});

test("Should run the main funtion successfully for PAN", async () => {
  const op = await main(testBufferPan);
  if (!op) {
    expect(op).toBe(null);
  }
  expect(op.panName).toBe("RISHABH NAGAR");
});

test("Should run the main funtion unsuccessfully for non-card image buffer", async () => {
  var thrownError
  try {
    const op = await main(testBufferNonCard);
  } catch (error) {
    thrownError = error;
  }
  expect(thrownError.message).toBe('Card type can not be detected');
});

test("verify card should be run successfully", () => {
  const op = verifyCard(textAadhar, cardVerifyConfig);
  expect(op).toBe("aadhar");
});

test("verify card should be run successfully", () => {
  const op = verifyCard(textPan, cardVerifyConfig);
  expect(op).toBe("pan");
});

test("verify card should return false for wrong test data", () => {
  const op = verifyCard(wrongText, cardVerifyConfig);
  expect(op).toBe(false);
});