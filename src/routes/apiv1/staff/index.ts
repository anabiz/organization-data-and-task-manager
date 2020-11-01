import { Request, Response, Router } from "express";
import { createStaff } from "../../../controller/queries";
import { staffSchema } from "../../../schema/validation/staff";
import { getAllStaffByCompanyId } from "../../../controller/queries";
import jwt from "jsonwebtoken";

import { checkCeo } from "../../../middleware/checkCeo"
import bcrypt from "bcrypt";


const router = Router();


/* GET home page. */
router.post("/addstaff", async function (req: Request, res: Response) {
  try {
    const data = req.body;
    if(data.password !== data.confirm_password || data.password.length < 6){
        return res.status(400).json({message: "password does not match or password is less than 6 characters"})
    }
    const { error, value } = staffSchema.validate(data, {
    stripUnknown: true,
    abortEarly: false,
    });
    if (error) {
    return res.status(400).json({message: error.message});
    }
    const hashpassword = await bcrypt.hash(value.password, 10);
    delete value.confirm_password;
    const user = {
      ...value,
      password: hashpassword,
    }
    const new_user = await createStaff(user);
    return res.status(200).json(new_user);
  } catch (error) {
    return res.status(500).json({ message:error });
  }
});

router.get("/allstaff", checkCeo, async function (req: Request, res: Response) {
  const userInfo = req.cookies.userData;
try {
  console.log("i am good to go");
  const user: any = jwt.verify(userInfo, `${process.env.ACCESS_TOKEN_SECRET}`);
  if(!user.ceo) return res.status(404).json("unauthorised")
  const staff: any = await getAllStaffByCompanyId(user.id);
        
  return res.status(200).json({registeredStaff: staff})
 
} catch (error) {
  return res.status(200).json({data: "unable to get staff try again later"});
}
});

export default router;
