"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res.status(500).json({
        success: false,
        message: "No route found",
        error: {
            code: 404,
            description: "No route found"
        }
    });
};
exports.default = notFound;
