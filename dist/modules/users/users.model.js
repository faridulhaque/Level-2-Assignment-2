"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserSchema = exports.OrdersSchema = exports.AddressSchema = exports.FullNameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FullNameSchema = new mongoose_1.Schema({
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
exports.AddressSchema = new mongoose_1.Schema({
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
exports.OrdersSchema = new mongoose_1.Schema({
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
exports.UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "User id is required"],
        trim: true,
        unique: true,
    },
    userName: {
        type: String,
        required: [true, "User name is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    fullName: exports.FullNameSchema,
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
    address: exports.AddressSchema,
    hobbies: {
        type: [String],
    },
    orders: {
        type: [exports.OrdersSchema],
        default: []
    }
});
exports.userModel = (0, mongoose_1.model)("Users", exports.UserSchema);
// this file is used to declare all the schema for users.
