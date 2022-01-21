export const cardVerifyConfig = {
  aadhar: (text: string) => {
    const aadharNo = text.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
    const government = text.match(/(GOVERNMENT|Government)/);
    if (aadharNo && government) return true;
    else return false;
  },
  pan: (text: string) => {
    const panNo = text.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
    const govt = text.match(/(GOVT.|Govt.)/);
    const INCOME = text.match(/(INCOME|Income|income)/);
    const TAX = text.match(/(TAX|Tax|tax)/);
    const DEPARTMENT = text.match(/(DEPARTMENT|Department|department)/);
    if (panNo && govt && INCOME && TAX && DEPARTMENT) return true;
    else return false;
  },
};
