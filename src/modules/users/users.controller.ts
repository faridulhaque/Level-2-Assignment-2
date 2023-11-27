import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUserService,
  deleteOneUserService,
  getAllUsersService,
  getOneUserService,
  updateUserService,
} from "./users.sevices";
import { JoiUserSchema } from "./users.validation";
import { doesUserExist } from "../orders/doesUserExist";
import { userModel } from "./users.model";

// this function is used to create a new user in database.

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;

    const user = await userModel.findOne({
      $or: [{ userName: req?.body?.userName }, { userId: req?.body?.userId }],
    });

    if (user?.userId) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        error: {
          code: 404,
          description: "User already exists",
        },
      });
    }

    const { error, value } = JoiUserSchema.validate(newUser);
    if (error) {
      res.status(404).json({
        success: false,
        message: error?.message,
        error: {
          code: 404,
          description: error?.message,
        },
      });
      return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newUser?.password, salt);
    value.password = passwordHash;

    const response = await createUserService(value);

    const result: any = response?.toObject();

    delete result.password;
    delete result._id;
    delete result.orders;

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// this function is being used to getting all the existing users from database.

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response:any = await getAllUsersService();
    if (!response?.length) {
      return res.status(404).json({
        success: false,
        message: "No users found!",
        error:{
          code: 404,
          description: "User not found"
        }
      });
    }

    const result = response

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// the function below is for getting one specific user base on the user's specific id.

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await getOneUserService(id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// the function below is deleting a user

export const deleteOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await deleteOneUserService(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// this function is updating the user's data

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;

    const { error, value } = JoiUserSchema.validate(newData);

    if (error) {
      return res.status(404).json({
        success: false,
        message: error?.message,
        error: {
          code: 404,
          description: error?.message,
        },
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ userName: newData?.userName }, { userId: newData?.userId }],
    });

    if (!existingUser?.userId) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newData?.password, salt);

      value.password = passwordHash;

      const response = await updateUserService(userId, value);

      if (response?.acknowledged) {
        const result: any = await getOneUserService(newData?.userId);
        return res.status(200).json({
          success: true,
          message: "User updated successfully!",
          data: result,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Username or userId already in use",
        error: {
          code: 404,
          description: "Username or userId already in use",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// this one is not a controller but a function that is called inside a few controllers
