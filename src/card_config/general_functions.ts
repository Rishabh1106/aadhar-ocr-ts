import { detectFaces, funcJimp } from "../services/main_service";

export const photoExtraction = async (inputBuffer: Buffer) => {
  const faces = await detectFaces(inputBuffer);
  const x0 = faces[0].boundingPoly.vertices[0].x;
  const y0 = faces[0].boundingPoly.vertices[0].y;
  const x2 = faces[0].boundingPoly.vertices[2].x;
  const y2 = faces[0].boundingPoly.vertices[2].y;
  const encoded = await funcJimp(x0, y0, x2 - x0, y2 - y0, inputBuffer);
  return encoded;
};
