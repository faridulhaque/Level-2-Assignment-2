import { Schema, model } from "mongoose";
import { TOrders } from "./orders.interfaces";

export const OrdersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  quantity: { type: Number, required: true, trim: true },
});


