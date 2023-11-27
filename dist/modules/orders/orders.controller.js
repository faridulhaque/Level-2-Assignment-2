"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalPrice = exports.getOrdersOfUser = exports.placeOrder = void 0;
const orders_services_1 = require("./orders.services");
// place order for a specific user
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const id = req.params.userId;
        const result = yield (0, orders_services_1.placeOrderService)(id, order);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.placeOrder = placeOrder;
// get order for a specific user
const getOrdersOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield (0, orders_services_1.getAllOrderService)(id);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOrdersOfUser = getOrdersOfUser;
// get total amount of ordered products of a specific user
const getTotalPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const totalPrice = yield (0, orders_services_1.getTotalPriceService)(id);
        res.status(200).json({
            success: true,
            message: "Total Price calculated successfully!",
            data: { totalPrice: totalPrice ? totalPrice.toFixed(2) : null }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTotalPrice = getTotalPrice;
