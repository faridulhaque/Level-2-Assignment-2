import Joi from 'joi';

export const JoiOrdersSchema = Joi.object({
  productName: Joi.string().required().trim(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
