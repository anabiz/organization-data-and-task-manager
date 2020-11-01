import { Request, Response, Router } from "express";
import { createCompany } from "../../../controller/queries";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { updateCompanyVerifyEmailToken } from "../../../controller/queries";
import { updateCompanyVerificationStatus } from "../../../controller/queries"
import mailer from "../../../controller/sendEmail"
import { companySchema } from "../../../schema/validation/company";
import { companyVerifyEmailBody } from "../../../emailBodyMessages/verifyCompanyEmailBody"

const router = Router();


router.post("/createaccount", async function (req: Request, res: Response) {
  try {
    const data = req.body;

    if (req.body.password !== req.body.confirm_password || req.body.password.length < 6) {
      return res.status(400).json({ message: "password does not match or less than 6 characters" });
    }

    const { error, value } = companySchema.validate(data, {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const hashpassword = await bcrypt.hash(value.password, 10);
    delete value.confirm_password;
    const company = {
      ...value,
      password: hashpassword,
    }
    try {
      const newCompany = await createCompany(company);
      const tokenData = { id: newCompany.id, email: newCompany.email }
      const verifyEmailToken = jwt.sign(tokenData, "my dotenv must be delivered");
      if (await updateCompanyVerifyEmailToken(verifyEmailToken, newCompany.id) == -1) {
        //for now do a console log
        console.log('token failed to store');
      }

      if (newCompany.id) {
        const result = await mailer(newCompany.email, companyVerifyEmailBody(verifyEmailToken));
        if (result == -1) {
          return res.status(500).json({ message: "data stored, but verify email not sent" })
        }
      }
      return res.status(200).json(newCompany);
    } catch (error) {
      return res.status(500).json({ error })
    }

  } catch (error) {
    return res.status(404).json({ message: error });
  }
});


router.get("/verifycompanyemail/:id", async function (req: Request, res: Response) {
  console.log(req.params);
  const resetLink = req.params.id;

  try {
    const verify = jwt.verify(resetLink, "my dotenv must be delivered");
    console.log(verify);

    const result = await updateCompanyVerificationStatus("true", resetLink);
    if (result === -1) {
      return res.status(500).json({ message: "unable to verify email, please try again" });
    }
    return res.json({ message: verify, success: "email verification, successful" })
  } catch (error) {
    return res.status(400).json({ message: "invalid or expired token" })
  }

});

export default router;
