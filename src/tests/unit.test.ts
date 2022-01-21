import { cardVerifyConfig } from "../card-config/card_verify_config";
import { main } from "../services/main_service";
import { verifyCard } from "../services/verify_card_service";
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
  expect(op.aadharName).toBe("Rishabh Nagar");
});

test("Should run the main funtion successfully for PAN", async () => {
  const op = await main(testBufferPan);
  expect(op.panName).toBe("RISHABH NAGAR");
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

