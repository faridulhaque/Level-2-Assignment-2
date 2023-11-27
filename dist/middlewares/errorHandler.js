"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};
exports.default = errorHandler;
//global error handler function
