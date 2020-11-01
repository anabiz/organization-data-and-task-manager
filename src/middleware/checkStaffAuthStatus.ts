import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkStaffAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userInfo = req.cookies.userData;
  const staffId = req.params.id;
  try {
    if (!userInfo) {
      return res.status(404).json("Please, login. No cookies!");
    }
    const user: any = jwt.verify(
      userInfo,
      `${process.env.ACCESS_TOKEN_SECRET}`,
    );
    if (user.id !== staffId) return res.status(404).json("unauthorised");
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(400).json(req);
};
