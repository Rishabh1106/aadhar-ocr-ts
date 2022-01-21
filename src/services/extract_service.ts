interface resObj {
  [key: string]: any;
}

export const extractFunction = async (
  configObject: Object,
  text: string,
  inputBuffer: Buffer
) => {
  const resObj: resObj = {};

  for (const key of Object.keys(configObject)) {
    if (key !== "photo") {
      resObj[key] = configObject[key](text);
    } else {
      resObj[key] = await configObject[key](inputBuffer);
    }
  }
  return resObj;
};
