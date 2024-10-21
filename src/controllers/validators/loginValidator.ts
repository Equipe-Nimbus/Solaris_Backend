import Joi from 'joi';

export const loginSchema = Joi.object({
  email_user: Joi.string().email().required(),
  senha_user: Joi.string().min(8).required(),
});
