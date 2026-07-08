import express from "express";
import { getActiveCartForUser } from "../services/cartService.js";



const router = express.Router();

router.get('/',async (req,res)=>{
    // to do : get the userId from the jwt , after validating from middleware

    const cart = await getActiveCartForUser("wewewe");
    res.status(200).send(cart);
})

export default router;