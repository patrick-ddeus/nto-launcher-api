import Joi from 'joi';

export const gameUpdateSchema = Joi.object({
  client_version: Joi.string().required(),
  last_update: Joi.date().iso().optional(),
  otc_download_link: Joi.string().uri().optional(),
  old_download_link: Joi.string().uri().optional(),
  original_otc_mediafire_link: Joi.string().uri().required(),
  original_old_mediafire_link: Joi.string().uri().required(),
  changes: Joi.array().items(Joi.string()).optional(),
});