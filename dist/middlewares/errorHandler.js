"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res) => {
    res.status(500).json({
        success: false,
        message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong",
        error: {
            code: 404,
            description: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong"
        }
    });
};
exports.default = errorHandler;
// 
