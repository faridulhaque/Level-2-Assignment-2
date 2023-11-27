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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteOneUser = exports.getOneUser = exports.getAllUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_sevices_1 = require("./users.sevices");
const users_validation_1 = require("./users.validation");
const users_model_1 = require("./users.model");
// this function is used to create a new user in database.
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const newUser = req.body;
        const user = yield users_model_1.userModel.findOne({
            $or: [{ userName: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userName }, { userId: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId }],
        });
        if (user === null || user === void 0 ? void 0 : user.userId) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                error: {
                    code: 404,
                    description: "User already exists",
                },
            });
        }
        const { error, value } = users_validation_1.JoiUserSchema.validate(newUser);
        if (error) {
            res.status(404).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                error: {
                    code: 404,
                    description: error === null || error === void 0 ? void 0 : error.message,
                },
            });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(newUser === null || newUser === void 0 ? void 0 : newUser.password, salt);
        value.password = passwordHash;
        const response = yield (0, users_sevices_1.createUserService)(value);
        const result = response === null || response === void 0 ? void 0 : response.toObject();
        delete result.password;
        delete result._id;
        delete result.orders;
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// this function is being used to getting all the existing users from database.
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, users_sevices_1.getAllUsersService)();
        if (!(response === null || response === void 0 ? void 0 : response.length)) {
            return res.status(404).json({
                success: false,
                message: "No users found!",
                error: {
                    code: 404,
                    description: "User not found"
                }
            });
        }
        const result = response;
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
// the function below is for getting one specific user base on the user's specific id.
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield (0, users_sevices_1.getOneUserService)(id);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
// the function below is deleting a user
const deleteOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield (0, users_sevices_1.deleteOneUserService)(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneUser = deleteOneUser;
// this function is updating the user's data
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const newData = req.body;
        const { error, value } = users_validation_1.JoiUserSchema.validate(newData);
        if (error) {
            return res.status(404).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                error: {
                    code: 404,
                    description: error === null || error === void 0 ? void 0 : error.message,
                },
            });
        }
        const existingUser = yield users_model_1.userModel.findOne({
            $or: [{ userName: newData === null || newData === void 0 ? void 0 : newData.userName }, { userId: newData === null || newData === void 0 ? void 0 : newData.userId }],
        });
        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.userId)) {
            const salt = yield bcrypt_1.default.genSalt();
            const passwordHash = yield bcrypt_1.default.hash(newData === null || newData === void 0 ? void 0 : newData.password, salt);
            value.password = passwordHash;
            const response = yield (0, users_sevices_1.updateUserService)(userId, value);
            if (response === null || response === void 0 ? void 0 : response.acknowledged) {
                const result = yield (0, users_sevices_1.getOneUserService)(newData === null || newData === void 0 ? void 0 : newData.userId);
                return res.status(200).json({
                    success: true,
                    message: "User updated successfully!",
                    data: result,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Username or userId already in use",
                error: {
                    code: 404,
                    description: "Username or userId already in use",
                },
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// this one is not a controller but a function that is called inside a few controllers
