import { Router } from "express";
import { userRouter } from "../controllers/userController";
import errorHandler from "../middlewares/errorHandler";
import { ensureAuthenticated } from "../middlewares/protectedRoute";

const router = Router();
router.use("/account", userRouter, errorHandler);

export { router as authRouter };
