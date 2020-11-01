import { Request, Response, Router } from "express";
import { createStaff } from "../../../controller/queries";
import { staffSchema } from "../../../schema/validation/staff";
import {
  getAllStaffByCompanyId,
  getStaffById,
  deleteStaffById,
  updateStaffById,
} from "../../../controller/queries";
import { checkStaffAuth } from "../../../middleware/checkStaffAuthStatus";

import { verifyToken } from "../../../middleware/verifyToken";
import jwt from "jsonwebtoken";

import { checkCeo } from "../../../middleware/checkCeo";
import bcrypt from "bcrypt";

const router = Router();

//Only the CEO can create staff Account. After which the staff can change his password
router.post("/addstaff", checkCeo, async function (
  req: Request,
  res: Response,
) {
  try {
    const data = req.body;
    if (data.password !== data.confirm_password || data.password.length < 6) {
      return res.status(400).json({
        message:
          "password does not match or password is less than 6 characters",
      });
    }
    const { error, value } = staffSchema.validate(data, {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const hashpassword = await bcrypt.hash(value.password, 10);
    delete value.confirm_password;
    const user = {
      ...value,
      password: hashpassword,
    };
    const new_user = await createStaff(user);
    return res.status(200).json(new_user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//any one can get all the staff in the company
router.get("/allstaff", verifyToken, async function (
  req: Request,
  res: Response,
) {
  const userInfo = req.cookies.userData;
  try {
    console.log("i am good to go");
    const user: any = jwt.verify(
      userInfo,
      `${process.env.ACCESS_TOKEN_SECRET}`,
    );
    if (!user.ceo) return res.status(404).json("unauthorised");
    const staff: any = await getAllStaffByCompanyId(user.id);

    return res.status(200).json({ registeredStaff: staff });
  } catch (error) {
    return res
      .status(200)
      .json({ data: "unable to get staff try again later" });
  }
});

//CEO can get any staff by id. However, a staff can only get his only data and not that of others.
router.get("/:id", verifyToken, async function (req: Request, res: Response) {
  const staffId = req.params.id;
  try {
    console.log("i am good to go");

    const staff: any = await getStaffById(staffId);

    return res.status(200).json({ staffData: staff });
  } catch (error) {
    return res
      .status(200)
      .json({ data: "unable to get staff try again later" });
  }
});

//Only ceo can delete a staff account
router.get("/delete/:id", checkCeo, async function (
  req: Request,
  res: Response,
) {
  const staffId = req.params.id;
  try {
    console.log("i am good to go");

    const staff: any = await deleteStaffById(staffId);

    return res
      .status(200)
      .json({ staffData: staff, successMessage: "account deleted" });
  } catch (error) {
    return res
      .status(200)
      .json({ data: "unable to delete staff account try again later" });
  }
});

//Only a staff can update his account, even the ceo can not update staff account.
router.put("/update/:id", checkStaffAuth, async function (
  req: Request,
  res: Response,
) {
  const staffId = req.params;
  const data = req.body;
  console.log(staffId.id);
  console.log(data);
  try {
    console.log("i am good to go");

    const staff: any = await updateStaffById(staffId.id, data);

    return res
      .status(200)
      .json({ staffData: staff, successMessage: "account updated" });
  } catch (error) {
    return res
      .status(200)
      .json({ data: "unable to update staff account try again later" });
  }
});

export default router;
