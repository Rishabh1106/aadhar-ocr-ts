import { aadharConfig } from "./aadhar-config";
import { panConfig } from "./pan-config";

interface objInterface {
  [key: string]: any;
}

export const supportedCards: objInterface = {
  aadhar: aadharConfig,
  pan: panConfig,
};
