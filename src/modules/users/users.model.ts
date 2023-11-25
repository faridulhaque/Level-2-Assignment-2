import { Schema, model } from "mongoose";
import { TAddress, TFullName, THobbies, TUsers } from "./users.interfaces";

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

export const UserSchema = new Schema<TUsers>({
  userId: {
    type: Number,
    required: [true, "User id is required"],
    trim: true,
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  fullName: FullNameSchema,
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
  address: AddressSchema,

  hobbies: {
    type: [String],
  },
});


export const userModel = model <TUsers>("Users", UserSchema);

// this file is used to declare all the schema for users. 