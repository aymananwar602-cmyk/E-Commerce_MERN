import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import type { IOrderItem } from "../models/orderModel.js";
import { orderModel } from "../models/orderModel.js";




const createCartForUser = async (userId: string) => {
    const cart = await cartModel.create({ userId, items: [], totalAmount: 0 , status: "Active"})
    await cart.save();
    return cart;
}

export const getActiveCartForUser = async (userId: string) => {
    let cart = await cartModel.findOne({ userId, status: "Active"});
    if (!cart){
        cart = await createCartForUser(userId);
    }
    return cart;
}


export const getCartByuserId = async (userId: string) => {
    const cart = await cartModel.findOne({ userId});
    if (!cart){
        throw new Error("cart not found");
    }
    return cart;
}


export const addItemToCart = async (userId: string, productId: string, quantity: number) => {
    const cart = await getActiveCartForUser(userId);

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
        return {data : "Items already exists in the cart" , status : 400};
    } 
        const product = await productModel.findById(productId);

        if (!product) {
            return {data : "Product not found" , status : 404};
        }
        if(product.stock < quantity){
            return { data : "not enough stock available", status :400};
        }
        cart.items.push({
            product: product,
            quantity: quantity,
            unitPrice: product.price 
        });
        cart.totalAmount += product.price * quantity;
        await cart.save();
        return {data : "Item added to cart" , status : 200};
    };

    export interface UpdateItemRequest  {
        productId: string;
        quantity: number;
        userId: string;
    }
    export const updateItemInCart = async ({userId, productId, quantity}:UpdateItemRequest) => {
        const cart = await getActiveCartForUser(userId);
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (!existingItem) {
            return {data : "Item not found in cart" , status : 404};
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return {data : "Product not found" , status : 404};
        }
        if(product.stock < quantity){
            return { data : "not enough stock available", status :400};
        }
        existingItem.quantity = quantity;
        const otherCartItems = cart.items.filter(item => item.product.toString() !== productId);
        const total = otherCartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        cart.totalAmount = total + (existingItem.unitPrice * existingItem.quantity);
        await cart.save();
        return {data : "Item updated in cart" , status : 200};
    }


    export interface deleteItemFromCart {
        productId: string;
        userId: string;
    }

    export const deleteItemFromCart = async ({userId, productId}:deleteItemFromCart) => {
        const cart = await getActiveCartForUser(userId);
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex === -1) {
            return {data : "Item not found in cart" , status : 404};
        }
        const [deletedItem] = cart.items.splice(existingItemIndex, 1);
        if (!deletedItem) {
            return { data: "Item not found in cart", status: 404 };
        }
        cart.totalAmount -= deletedItem.unitPrice * deletedItem.quantity;
        await cart.save();
        return {data : "Item deleted from cart" , status : 200};
    }

    export const clearCart = async(userId : string)=> {
        const cart = await getActiveCartForUser(userId);
        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();
        return {data : "Cart cleared" , status : 200};
    }

    export const checkout = async( userId: string , address: string)=>{
        if(!address){
            return {data : "Address is required" , status : 400};
        }
         const cart = await getActiveCartForUser(userId);
         const orderItems : IOrderItem[] = [];
         for (const item of cart.items){
            const product = await productModel.findById(item.product);
            if (!product) {
                return {data : "Product not found" , status : 404};
            }

            const orderItem : IOrderItem = {
                productTitle: product.title,
                productImage: product.image,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            }
            orderItems.push(orderItem);
         }

         const order = await orderModel.create({
            orderItems,
            total : cart.totalAmount,
            address : address,
            userId : userId
        });
        await order.save();

        cart.status = "completed";
        await cart.save();
        return { data: order, status: 200 };
    };
