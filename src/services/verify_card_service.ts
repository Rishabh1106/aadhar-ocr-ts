export const verifyCard = (text: string, cardVerifyConfig: Object) => {
  for (const key of Object.keys(cardVerifyConfig)) {
    if (cardVerifyConfig[key](text)) {
      return key;
    }
  }
  return false;
};
