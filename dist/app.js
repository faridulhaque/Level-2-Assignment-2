"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = require("./routes/users.routes");
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));
app.use("/api/users", users_routes_1.usersRoutes);
app.use("*", (req, res) => {
    res.status(200).json({ message: "no route found" });
});
// error handle
app.use((err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
});
// not found handler
app.use(notFound_1.default);
exports.default = app;
