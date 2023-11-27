import { TOrders, TUsers } from "../users/users.interfaces";
import { userModel } from "../users/users.model";

// placing order

export const placeOrderService = async (id: string, body: TOrders) => {
  const result = await userModel.updateOne(
    { userId: id },
    { $push: { orders: body } }
  );
  return result;
};

// getAllOrders

export const getAllOrderService = async (id: string) => {
  if (id) {
    const res: any = await userModel
      .findOne({ userId: id })
      .select({
        "orders.productName": 1,
        "orders.price": 1,
        "orders.quantity": 1,
        _id: 0,
      });

    return res;
  }

  return null;
};

// get total price
export const getTotalPriceService = async (id: string) => {
  if (id) {
    const res: any = await userModel
      .findOne({ userId: id })
      .select({ orders: 1, _id: 0 });

    let total: number = 0;
    res.orders.map((order: TOrders) => {
      const subTotal = order.price * order.quantity;
      total = total + subTotal;
    });

    return total;
  }

  return null;
};
