import { Router } from "express";
import { gameRouter } from "../controllers/gameController";

const router = Router();
router.use("/", gameRouter);

export { router as routes };
