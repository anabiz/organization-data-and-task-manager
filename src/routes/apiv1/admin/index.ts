import { Request, Response, Router } from "express";
import { getAdmin } from "../../../controller/queries";


const router = Router();

router.get("/", async function (req: Request, res: Response) {
    try {
      
    } catch (error) {
      
    }
      const user = await getAdmin(req.params.email);
      res.status(200).json({data: user});
      // res.status(200).json({
      //   data: {
      //     result: "hello",
      //   },
      //   error: "",
      //   next: "",
      //   previous: "",
      // });
    });
    
    export default router;
    