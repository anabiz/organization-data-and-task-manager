
import joi from "joi";

export const staffSchema = joi.object({
  company_id: joi.string().required(),
  first_name: joi.string().max(255).required(),
  last_name: joi.string().max(255).required(),
  password: joi.string().min(6).max(255).required(),
  confirm_password: joi.string().min(6).max(255).required(),
  address: joi.string().max(255).required(),
  email: joi.string().max(255).required(),
  image_link: joi.string().max(255),
});