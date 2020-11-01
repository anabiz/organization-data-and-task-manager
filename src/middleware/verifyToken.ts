import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userInfo = req.cookies.userData;
  try {
    const user: any = jwt.verify(
      userInfo,
      `${process.env.ACCESS_TOKEN_SECRET}`,
    );
    if (!user) return res.status(404).json("unauthorised");
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(400).json(req);
};
