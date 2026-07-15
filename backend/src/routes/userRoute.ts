import express  from "express";
import { login , register } from "../services/userService.js";

const router = express.Router(); 

router.post("/register", async (request ,response) => {
    try{const { firstName, lastName, email, password } = request.body;
    const result = await register({ firstName, lastName, email, password });
    response.status(201).json(result);}
    catch(err){
        response.status(500).json({error : "Internal server error"});
    }
    
});



router.post("/login", async (request ,response) => {
    try{const {email, password } = request.body;
    const {statuscode , data } = await login({email, password})
    response.status(statuscode).send(data);}
    catch(err){
        response.status(500).json({error : "Internal server error"});
    }
})



export default router;