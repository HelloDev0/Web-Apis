import { validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";


export function validator(
    req:Request,
    res:Response,
    next:NextFunction
){
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({send:errors.array()})
        }
        next()
}