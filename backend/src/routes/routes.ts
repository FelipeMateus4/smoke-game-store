import { Router } from "express";
import { gameRouter } from "../controllers/gameController";

const router = Router();
router.use("/store", gameRouter);

export { router as routes };
