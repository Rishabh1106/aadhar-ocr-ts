import { aadharConfig } from "./aadhar_config";
import { panConfig } from "./pan_config";

interface objInterface {
  [key: string]: any;
}

export const supportedCards: objInterface = {
  aadhar: aadharConfig,
  pan: panConfig,
};
