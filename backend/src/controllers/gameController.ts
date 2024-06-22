import { Router, Request, Response } from "express";
import { GameModel } from "../model/gameModel";
import { GameType } from "../types/game";

const router = Router();
router.post("/game/register", async (req: Request, res: Response) => {
    const game: GameType = {
        title: req.body.title,
        price: req.body.price,
        tags: req.body.tags,
        description: req.body.description,
        platform: req.body.platform,
        url: req.body.url,
    };
    await GameModel.sync();
    try {
        await GameModel.create(game);
        res.status(201).send("Game created successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

export { router as gameRouter };
