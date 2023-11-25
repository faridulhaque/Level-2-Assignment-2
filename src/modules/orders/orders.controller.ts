import { NextFunction, Request, Response } from "express";
import { userModel } from "../users/users.model";
import { placeOrderService } from "./orders.services";


// place order for a specific user
export const placeOrder = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const order = req.body
        const id  = req.params.userId

        const result = await placeOrderService(id, order)

        console.log(result)
        
        
    } catch (error) {
        console.log(error)
    }
}