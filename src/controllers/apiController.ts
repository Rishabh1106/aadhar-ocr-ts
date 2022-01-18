import { ValidationError } from "../middleware/customErrorClass";
import { main } from "../services/mainService";

export const apiController = async (req, res,next) => {
    try{
        if(Object.keys(req.body).length === 0){
            throw new ValidationError("Please give fields required",400);
        } else{
        const resJSON = await main(req.file.buffer,req.body);
        res.status(200).json(resJSON)
        }
    } catch(err){
        next(err);
    }
}