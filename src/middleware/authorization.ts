import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: any = req.headers["authorization"]?.split(" ")[1];
    jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      (err: any, user: Express.User | undefined) => {
        if (err) return res.status(403).json({ err });
        req.user = user;
        next();
        return;
      },
    );
  } catch (error) {
    res.status(400).json({
      data: {
        result: "",
        error: "sorry you don't have authorization",
      },
    });
  }
}
