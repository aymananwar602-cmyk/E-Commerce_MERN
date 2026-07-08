import { cartModel } from "../models/cartModel.js";




const createCartForUser = async (userId: string) => {
    const cart = await cartModel.create({ userId, items: [], totalAmount: 0 , status: "Active"})
    await cart.save();
    return cart;
}

export const getActiveCartForUser = async (userId: string) => {
    let cart = await cartModel.findOne({ userId, status: "Active"}).populate("items.product")
    if (!cart){
        cart = await createCartForUser(userId);
    }
    return cart;
}


export const getCartByuserId = async (userId: string) => {
    const cart = await cartModel.findOne({ userId}).populate("items.product");
    if (!cart){
        throw new Error("cart not found");
    }
    return cart;
}


