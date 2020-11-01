import { Request, Response, Router } from "express";
import { assignTaskById } from "../../../controller/queries";
import { checkCeo } from "../../../middleware/checkCeo";
import { taskSchema } from "../../../schema/validation/task";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../../middleware/verifyToken";
import { getTaskById } from "../../../controller/queries"

const router = Router();

router.post("/assigntask/:id", checkCeo, async function (req: Request, res: Response) {
    const staff_id = req.params.id;
    const formInput = req.body;

    console.log(staff_id);
    try {
        const userInfo = req.cookies.userData;
        const user: any = jwt.verify(userInfo, `${process.env.ACCESS_TOKEN_SECRET}`);
        const company_id = user.id;
        console.log(company_id);
        const data = { ...formInput, company_id, staff_id };

        const { error, value } = taskSchema.validate(data, {
            stripUnknown: true,
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const task: any = await assignTaskById(value);
        if (task !== -1) {
            return res.status(200).json({ taskData: task, successMessage: "task asigned" });
        }
        return res.status(500).json({ data: "unable to assign task try again later" });
    } catch (error) {
        return res.status(400).json({ data: "unable to assign task try again later" });
    }
});

router.get("/mytask", verifyToken, async (req: Request, res: Response) => {
    try {
        const userInfo = req.cookies.userData;
        const user: any = jwt.verify(userInfo, `${process.env.ACCESS_TOKEN_SECRET}`);
        const userId = user.id;
        const task: any = await getTaskById(userId);
        if (task !== -1) {
            return res.status(200).json({ taskData: task });
        }

        return res.status(500).json({ data: "unable to get task try again later" });
    } catch (error) {
        return res.status(400).json({ data: "unable to get task try again later" });
    }
});

export default router;