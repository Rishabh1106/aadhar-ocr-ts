// here a function will be there which will take the confile object and using google vision api, have to find the field


// object will be passed and it will return a json

// define the rules here only
interface resObj {
    [key: string]: any
}

export const extractFunction = async (configObject : Object,text:string,inputBuffer:Buffer)=>{
    const resObj : resObj = {};

    for(const key of Object.keys(configObject)){
        if(key!=='photo'){
            resObj[key] = configObject[key](text);
        }
        else{
            resObj[key] = await configObject[key](inputBuffer)
        }
    }
    return resObj;
}