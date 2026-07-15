import express from "express";
import { getActiveCartForUser, addItemToCart, updateItemInCart } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendedRequest } from "../types/extendedRequests.js";
import { deleteItemFromCart, type UpdateItemRequest } from "../services/cartService.js";
import { clearCart } from "../services/cartService.js";
import { checkout } from "../services/cartService.js";


const router = express.Router();
router.get('/', validateJWT, async (req: ExtendedRequest, res) => {
    try{const userId = req?.user?._id;
    const cart = await getActiveCartForUser(userId);
    res.status(200).send(cart);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
    
})

router.delete('/', validateJWT, async (req: ExtendedRequest, res) => {
    try{const usrId = req?.user?._id;
    const response = await clearCart(usrId);
    res.status(200).send(response.data);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
     
})


router.post('/items', validateJWT, async (req: ExtendedRequest, res) => {
    try{const userId = req?.user?._id;
    const {productId, quantity} = req.body;
    const response = await addItemToCart(userId , productId, quantity);
    res.status(200).send(response.data);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
})

router.put('/items' , validateJWT, async (req: ExtendedRequest, res) => {
    try{const userId = req?.user?._id;
    const {productId} = req.params;
    const {quantity} = req.body;
    const response = await updateItemInCart({userId, productId, quantity} as UpdateItemRequest);
    res.status(200).send(response.data);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
    
})

router.delete('/items/:productId', validateJWT, async (req: ExtendedRequest, res) => {
    try{const userId = req?.user?._id;
    const {productId} = req.params;
    const response = await deleteItemFromCart({userId, productId } as deleteItemFromCart);
    res.status(200).send(response.data);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
});

router.post('/checkout', validateJWT, async ( req: ExtendedRequest, res)=>{
    try{const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout(userId, address);
    res.status(200).send(response.data);}
    catch(err){
        res.status(500).send({error : "Internal server error"});
    }
})

export default router;