// here I will verify the card is aadhar or pan or other
// in case of aadhar return aadhar
// in case of pan return pan
// in case of other return other


export const verifyCard = (text:string) => {
    console.log(text)
    // write logic to verify aadhar card and pan card
    const aadharNo = text.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
    const panNo = text.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
    const government = text.match(/(GOVERNMENT|Government)/);
    const govt = text.match(/(GOVT.|Govt.)/);
    const INCOME = text.match(/(INCOME|Income|income)/);
    const TAX = text.match(/(TAX|Tax|tax)/);
    const DEPARTMENT = text.match(/(DEPARTMENT|Department|department)/);

    if(aadharNo && government){
        return 'aadhar';
    } 
    else if(panNo && govt && INCOME && TAX && DEPARTMENT ){
        return "pan";
    }
    else{
        return 'other'
    }


} 