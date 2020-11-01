import { Router } from "express";
import companyRoutes from "./company";
import staffRoutes from "./staff";
import LoginRoutes from "./login";
import LogoutRoutes from "./logout";
import adminRoutes from "./admin";
import taskRouters from "./task"

const router = Router();

/* GET home page. */
router.use("/company", companyRoutes);
router.use("/staff", staffRoutes);
router.use("/login", LoginRoutes);
router.use("/logout", LogoutRoutes);
router.use("/admin", adminRoutes);
router.use("/task", taskRouters);


export default router;
