import Joi from 'joi';

export const userSchema = Joi.object({
  nome_user: Joi.string().min(3).max(100).required(),
  senha_user: Joi.string().min(8).max(100).required(),
  email_user: Joi.string().email().required(),
  cpf_user: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
});
