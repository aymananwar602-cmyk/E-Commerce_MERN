import express  from "express";
import { login , register } from "../services/userService.js";

const router = express.Router(); 

router.post("/register", async (request ,response) => {
    const { firstName, lastName, email, password } = request.body;
    const result = await register({ firstName, lastName, email, password });
    response.status(201).json(result);
});



router.post("/login", async (request ,response) => {
    const {email, password } = request.body;
    const {statuscode , data } = await login({email, password})
    response.status(statuscode).send(data)
})



export default router;