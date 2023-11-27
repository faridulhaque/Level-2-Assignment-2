import { NextFunction, Request, Response } from "express";
import { userModel } from "../users/users.model";
import {
  getAllOrderService,
  getTotalPriceService,
  placeOrderService,
} from "./orders.services";

// place order for a specific user
export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body;
    const id = req.params.userId;
    const result = await placeOrderService(id, order);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// get order for a specific user
export const getOrdersOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await getAllOrderService(id);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get total amount of ordered products of a specific user
export const getTotalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const totalPrice: number | null = await getTotalPriceService(id);
    res.status(200).json({
      success: true,
      message: "Total Price calculated successfully!",
      data: { totalPrice: totalPrice ? totalPrice.toFixed(2) : null }

    });
  } catch (error) {
    next(error);
  }
};
