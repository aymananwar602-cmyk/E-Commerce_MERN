import express from "express";
import { getActiveCartForUser } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";



const router = express.Router();

router.get('/', validateJWT, async (req, res) => {
    const userId = (req as any).user._id;
    // to do : get the userId from the jwt , after validating from middleware
    const cart = await getActiveCartForUser(userId);
    res.status(200).send(cart);
})

export default router;