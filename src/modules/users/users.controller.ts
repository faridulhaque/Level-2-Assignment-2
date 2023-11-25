import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUserService,
  deleteOneUserService,
  getAllUsersService,
  getOneUserService,
  updateUserService,
} from "./users.sevices";
import { JoiUserSchema } from "./users.validation";


// this function is used to create a new user in database.

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

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

    const result = await createUserService(value);

    result.password = "";

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};



// this function is being used to getting all the existing users from database.

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersService();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


// the function below is for getting one specific user base on the user's specific id.

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await getOneUserService(id);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


// the function below is deleting a user

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await deleteOneUserService(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};


// this function is updating the user's data

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const newUser = req.body;

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

    const response = await updateUserService(id, value);

    let result: any;

    if (response?.acknowledged) {
      result = await getOneUserService(id);
    }

    result.password = "";

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
