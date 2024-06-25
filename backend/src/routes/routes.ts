import { Router } from "express";
import { gameRouter } from "../controllers/gameController";
import errorHandler from "../middlewares/errorHandler";
import { ensureAuthenticated } from "../middlewares/protectedRoute";

const router = Router();
router.use("/game", ensureAuthenticated, gameRouter, errorHandler);

export { router as routes };
