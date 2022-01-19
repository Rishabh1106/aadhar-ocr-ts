// the idea is to make the fields and rules to find.
// lets make an object which will have field and function need to run in order to find that field in text description.

const aadharConfig = {
    aadharNumber : (text:string)=>{
        text.match(/(\d+){4}\s(\d+){4}\s(\d+){4}/);
    },
    dob : (text:string)=>{
        text.match(/(\d){2}\/(\d{2})\/(\d{4})/);
    }
} 