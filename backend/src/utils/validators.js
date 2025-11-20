import Joi from 'joi';

export const createLinkSchema = Joi.object({
  url: Joi.string().uri({ scheme: ['http','https'] }).required(),
  code: Joi.string().alphanum().min(6).max(8).optional().allow('')
});
