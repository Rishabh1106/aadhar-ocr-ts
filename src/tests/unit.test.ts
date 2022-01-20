import { main } from "../services/mainService";
import { verifyCard } from "../services/verifyCardService";
import {
  testBufferAadhar,
  testBufferPan,
  textAadhar,
  textPan,
} from "./testData";

// take a test image

// test("should return the ip string", () => {
//   const txt = hello("hey");
//   expect(txt).toBe("hey");
// });

// this is not a unit test this is an integration test
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

// write unit tests for

test("verify card should be run successfully", () => {
  const op1 = verifyCard(textAadhar);
  expect(op1).toBe("aadhar");
  const op2 = verifyCard(textPan);
  expect(op2).toBe("pan");
});

// write unit tests for extract function
