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
exports.updateUserService = exports.deleteOneUserService = exports.getOneUserService = exports.getAllUsersService = exports.createUserService = void 0;
const users_model_1 = require("./users.model");
// creating user in database
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.create(user);
    return result;
});
exports.createUserService = createUserService;
// getting all users specific data
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.find().select({
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
exports.getAllUsersService = getAllUsersService;
// getting one user
const getOneUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.findOne({ userId: id }).select({
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        isActive: 1,
        hobbies: 1,
        userId: 1,
        _id: 0
    });
    return result;
});
exports.getOneUserService = getOneUserService;
// deleting one user
const deleteOneUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.deleteOne({ userId: id });
    return result;
});
exports.deleteOneUserService = deleteOneUserService;
// updating one user
const updateUserService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.userModel.updateOne({ userId: id }, body);
    return result;
});
exports.updateUserService = updateUserService;
