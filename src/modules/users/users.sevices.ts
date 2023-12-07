import { getAllUsers } from "./users.controller";
import { TUsers } from "./users.interfaces";
import { userModel } from "./users.model";

// creating user in database
export const createUserService = async (user: TUsers) => {
  const res = await userModel.create(user);
  const result = {
    userId: res?.userId,
    username: res?.username,
    fullName: {
      firstName: res?.fullName?.firstName,
      lastName: res?.fullName?.lastName,
    },
    age: res?.age,
    email: res?.email,
    isActive: res?.isActive,
    hobbies: res?.hobbies,
    address: {
      street: res?.address.street,
      city: res?.address.city,
      country: res?.address.country,
    },
  };

  return result;
};

// getting all users specific data
export const getAllUsersService = async () => {
  const result = await userModel.find().select({
    userId: 0,
    isActive: 0,
    hobbies: 0,
    orders: 0,
    __v: 0,
    "fullName._id": 0,
    "address._id": 0,
    _id: 0,
    password: 0,
  });

  return result;
};

// getting one user

export const getOneUserService = async (id: string) => {
  const result = await userModel.findOne({ userId: id }).select({
    username: 1,
    userId: 1,
    age: 1,
    email: 1,
    "fullName.firstName": 1,
    "fullName.lastName": 1,
    "address.city": 1,
    "address.street": 1,
    "address.country": 1,
    isActive: 1,
    hobbies: 1,
    _id: 0,
  });
  return result;
};

// deleting one user
export const deleteOneUserService = async (id: string) => {
  const result = await userModel.deleteOne({ userId: Number(id) });
  return result;
};

// updating one user

export const updateUserService = async (id: string, body: TUsers) => {
  const result = await userModel.updateOne({ userId: id }, body);
  return result;
};
