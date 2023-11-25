import { userModel } from "../users/users.model";
import { TOrders } from "./orders.interfaces";

export const placeOrderService = async (id: string, body: TOrders) => {
  const result = await userModel.updateOne(
    { _id: id },
    { $push: { orders: body } }
  );

  return result;
};

export const getAllOrderService = async (id: string) => {
  const result = await userModel.findOne().select({ orders: 1 });

  return result;
};

export const getTotalPrice = async (id: string) => {
  return;
};
