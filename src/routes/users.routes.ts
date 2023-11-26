import { Router } from "express";
import {
  createUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../modules/users/users.controller";
import {
  getOrdersOfUser,
  getTotalPrice,
  placeOrder,
} from "../modules/orders/orders.controller";
import { doesUserExist } from "../modules/orders/doesUserExist";

export const usersRoutes = Router();

usersRoutes.get("/:userId", doesUserExist, getOneUser);
usersRoutes.get("/", getAllUsers);
usersRoutes.get("/:userId/orders", doesUserExist, getOrdersOfUser);
usersRoutes.get("/:userId/orders/total-price", doesUserExist, getTotalPrice);
usersRoutes.post("/", createUser);
usersRoutes.put("/:userId/orders", doesUserExist, placeOrder);
usersRoutes.put("/:userId", doesUserExist, updateUser);
usersRoutes.delete("/:userId", doesUserExist, deleteOneUser);
