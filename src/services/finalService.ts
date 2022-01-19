// here a function will be there which will take the confile object and using google vision api, have to find the field


// object will be passed and it will return a json

// define the rules here only
interface resObj {
    [key: string]: any
}

export const extractFunction = (configObject : Object,text:string)=>{
    const resObj : resObj = {};

    for(const key of Object.keys(configObject)){
        //console.log(key,configObject[key](text));
        if(key!=='name'){
            resObj[key] = configObject[key](text);
        }else{
            
        }
    }
    console.log(resObj);
    return resObj;
}