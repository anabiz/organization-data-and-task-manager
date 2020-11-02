import { Request, Response, Router } from "express";
import { getAdmin } from "../../../controller/queries";

const router = Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const user = await getAdmin(req.params.email);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: " error occured " });
  }
});

export default router;
