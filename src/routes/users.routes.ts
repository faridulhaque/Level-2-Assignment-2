import {Router} from "express"
import { createUser, deleteOneUser, getAllUsers, getOneUser, updateUser } from "../modules/users/users.controller"


export const usersRoutes = Router()

usersRoutes.get("/:userId", getOneUser)
usersRoutes.get("/", getAllUsers)
usersRoutes.post("/", createUser)
usersRoutes.put("/:userId", updateUser)
usersRoutes.delete("/:userId", deleteOneUser)

