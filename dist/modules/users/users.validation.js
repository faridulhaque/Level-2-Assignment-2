"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiUserSchema = exports.JoiAddressSchema = exports.JoiFullNameSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const orders_validation_1 = require("../orders/orders.validation");
exports.JoiFullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().max(20).trim(),
    lastName: joi_1.default.string().required().max(20).trim(),
});
exports.JoiAddressSchema = joi_1.default.object({
    city: joi_1.default.string().required().max(20).trim(),
    street: joi_1.default.string().required().trim(),
    country: joi_1.default.string().required().min(3).trim(),
});
exports.JoiUserSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    fullName: exports.JoiFullNameSchema,
    age: joi_1.default.number(),
    email: joi_1.default.string().required(),
    isActive: joi_1.default.boolean().default(true),
    address: exports.JoiAddressSchema,
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    orders: orders_validation_1.JoiOrdersSchema,
});
