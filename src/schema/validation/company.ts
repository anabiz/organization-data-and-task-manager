import joi from "joi";


export const companySchema = joi.object({
     company_name: joi.string().max(50).required(),
     description: joi.string().max(255).required(),
     email: joi.string().max(255).required(),
     password: joi.string().min(6).max(255).required(),
     confirm_password: joi.string().min(6).max(255).required(),
     ceo: joi.string().max(50).required(),
     country: joi.string().max(50).required(),
     address: joi.string().max(255).required(),
     market_value: joi.number().max(100).required(),
     image_link: joi.string().max(255),
   });
