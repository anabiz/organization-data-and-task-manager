import joi from "joi";

export const taskSchema = joi.object({
  company_id: joi.string().max(255).required(),
  name: joi.string().max(255).required(),
  staff_id: joi.string().max(255).required(),
  description: joi.string().max(255).required(),
});
