import Joi from "joi";
import { JoiOrdersSchema } from "../orders/orders.validation";

export const JoiFullNameSchema = Joi.object({
  firstName: Joi.string().required().max(20).trim(),
  lastName: Joi.string().required().max(20).trim(),
});

export const JoiAddressSchema = Joi.object({
  city: Joi.string().required().max(20).trim(),
  street: Joi.string().required().trim(),
  country: Joi.string().required().min(3).trim(),
});

export const JoiUserSchema = Joi.object({
  userId: Joi.number().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  fullName: JoiFullNameSchema,
  age: Joi.number(),
  email: Joi.string().required(),
  isActive: Joi.boolean().default(true),
  address: JoiAddressSchema,
  hobbies: Joi.array().items(Joi.string()),
  orders: JoiOrdersSchema,
});
