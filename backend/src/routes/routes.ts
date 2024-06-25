import { Router } from "express";
import { gameRouter } from "../controllers/gameController";
import errorHandler from "../middlewares/errorHandler";

const router = Router();
router.use("/", gameRouter, errorHandler);

export { router as routes };
