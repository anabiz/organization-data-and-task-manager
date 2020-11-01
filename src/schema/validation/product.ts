import joi from "joi";

export const productSchema = joi.object({
  company_id: joi.string().max(255).required(),
  name: joi.string().max(255).required(),
  description: joi.string().max(255).required(),
});
