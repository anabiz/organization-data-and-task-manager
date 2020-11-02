import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  passport.authenticate("local", function (err, user, info): any {
    if (err !== undefined) {
      return res.status(500).json({ err });
    }
    try {
      if (user) {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const access_token = jwt.sign(
          user,
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: "10m" },
        );
        const refresh_token = jwt.sign(
          user,
          `${process.env.REFRESS_TOKEN_SECRET}`,
        );
        res.cookie("userData", access_token);
        return res.status(200).json({
          accessToken: access_token,
          refreshToken: refresh_token,
        });
      } else {
        res.status(401).json(info);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  })(req, res);
});

router.post("/:id", (req, res) => {
  passport.authenticate("local", function (err, user, info): any {
    if (err !== undefined) {
      return res.status(401).json({ error: err });
    }
    if (user) {
      const access_token = jwt.sign(
        user,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: "3m" },
      );
      const refresh_token = jwt.sign(
        user,
        `${process.env.REFRESS_TOKEN_SECRET}`,
      );

      return res.status(200).json({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
});

export default router;
