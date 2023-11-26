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
exports.getTotalPriceService = exports.getAllOrderService = exports.placeOrderService = void 0;
const users_model_1 = require("../users/users.model");
// placing order
const placeOrderService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.updateOne({ userId: id }, { $push: { orders: body } });
    return result;
});
exports.placeOrderService = placeOrderService;
// getAllOrders
const getAllOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        const res = yield users_model_1.userModel
            .findOne({ userId: id })
            .select({ 'orders.productName': 1, 'orders.price': 1, 'orders.quantity': 1, _id: 0 });
        return res;
    }
    return null;
});
exports.getAllOrderService = getAllOrderService;
// get total price
const getTotalPriceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        const res = yield users_model_1.userModel
            .findOne({ userId: id })
            .select({ orders: 1, _id: 0 });
        let total = 0;
        res.orders.map((order) => {
            const subTotal = order.price * order.quantity;
            total = total + subTotal;
        });
        return total;
    }
    return null;
});
exports.getTotalPriceService = getTotalPriceService;
