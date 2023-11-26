import { NextFunction, Request, Response } from "express";
import { userModel } from "../users/users.model";

export const doesUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  const userId = req?.params?.userId;

  const user = await userModel.findOne({ userId });
  if (user?.userId) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};
