import type {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import type { ExtendedRequest } from "../types/extendedRequests.js";





const validateJWT = (req: ExtendedRequest, res:Response , next:NextFunction) => {
    const authHeader = req.get("authorization");
    if(!authHeader){
        res.status(401).send("Authorization header was not provided");
        return;
    }
    const token  = authHeader.split(" ")[1];
    if(!token){
        res.status(401).send("token was not found");
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || " ", async (err,payload)=>{
        if(err){
            res.status(401).send("token is not valid");
            return;
        }

        if(!payload){
            res.status(403).send("token is not valid");
            return;
        }
        const userPayload = payload as any;
        const user =await userModel.findOne({email : userPayload.email});
        req.user = user;
        next();
    } );
}

export default validateJWT;