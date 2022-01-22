import request from "supertest";
import { app } from "../app";

test("Should be able to run on aadhar card successfully", async () => {
  const op = await request(app)
    .post("/api")
    .attach("file", "./test-images/my-aadhar.jpg")
    .expect(200)
    .then((res) => {
      return res.body;
    });
  expect(op.aadharName).toBe("Rishabh Nagar");
});

test("Should be able to run on pan card successfully", async () => {
  const op = await request(app)
    .post("/api")
    .attach("file", "./test-images/my-pan.jpg")
    .expect(200)
    .then((res) => {
      return res.body;
    });
  expect(op.panName).toBe("RISHABH NAGAR");
});

test("Should return an error with no file", async () => {
  const op = await request(app)
    .post("/api")
    .expect(401)
    .then((res) => {
      return res.body;
    });
  expect(op.message).toBe("Please provide a file");
});

test("Should return an error with non valid card type", async () => {
  const op = await request(app)
    .post("/api")
    .attach("file", "./test-images/non-card.png")
    .expect(401)
    .then((res) => {
      return res.body;
    });
  expect(op.message).toBe("Card type can not be detected");
});
