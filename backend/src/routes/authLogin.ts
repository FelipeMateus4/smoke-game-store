import { Router } from "express";
import { userRouter } from "../controllers/userController";

const router = Router();
router.use("/account", userRouter);

export { router as authRouter };
