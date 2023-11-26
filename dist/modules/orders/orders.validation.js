"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiOrdersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.JoiOrdersSchema = joi_1.default.object({
    productName: joi_1.default.string().required().trim(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
});
