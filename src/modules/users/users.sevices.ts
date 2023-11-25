import { getAllUsers } from "./users.controller";
import { TUsers } from "./users.interfaces";
import { userModel } from "./users.model";

// creating user in database
export const createUserService = async (user: TUsers) => {
  const result = await userModel.create(user);

  return result;
};


// getting all users specific data
export const getAllUsersService = async () => {
  const result = await userModel.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};


// getting one user

export const getOneUserService = async (id: string) => {
  const result = await userModel.findOne({ _id: id });
  return result;
};

// deleting one user
export const deleteOneUserService = async (id: string) => {
  const result = await userModel.deleteOne({ _id: id });
  return result;
};


// updating one user

export const updateUserService = async (id: string, body: TUsers) => {
  const result = await userModel.updateOne({ _id: id }, body);
  return result;
};

