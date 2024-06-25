import { Router } from "express";
import { userRouter } from "../controllers/userController";
import errorHandler from "../middlewares/errorHandler";

const router = Router();
router.use("/account", userRouter, errorHandler);

export { router as authRouter };
