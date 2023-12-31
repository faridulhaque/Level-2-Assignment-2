import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  THobbies,
  TOrders,
  TUsers,
} from "./users.interfaces";

export const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "Name is too long"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    maxlength: [20, "Name is too long"],
    trim: true,
  },
});

export const AddressSchema = new Schema<TAddress>({
  city: {
    type: String,
    required: [true, "City name is required"],
    maxlength: [20, "City name is too long"],
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country name is required"],
    minlength: [3, "Country name is too short"],
    trim: true,
  },
});

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

export const UserSchema = new Schema<TUsers>({
  userId: {
    type: Number,
    required: [true, "User id is required"],
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  fullName: {
    type: FullNameSchema,
    required: [true, "Full name is required"],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  address: {
    type: AddressSchema,
    required: [true, "Address is required"],
  },

  hobbies: {
    type: [String],
  },

  orders: {
    type: [OrdersSchema],
    default: [],
  },
});

export const userModel = model<TUsers>("Users", UserSchema);

// this file is used to declare all the schema for users.
