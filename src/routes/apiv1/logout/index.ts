import { Request, Response, Router } from "express";
//import passport from "passport";
const router = Router();

router.delete("/", async function (req: Request, res: Response) {
  req.logOut();
  res.status(200).json({
    data: {
      result: "logged out",
      rest: req.body.headers,
    },
    error: "",
    next: "",
    previous: "",
  });
});

export default router;
