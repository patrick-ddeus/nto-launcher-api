import Joi from 'joi';

export const gameUpdateSchema = Joi.object({
  client_version: Joi.string().required(),
  last_update: Joi.date().iso().optional(),
  download_link: Joi.string().uri().required(),
  changes: Joi.array().items(Joi.string()).optional(),
});