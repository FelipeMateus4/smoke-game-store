import { Router, Request, Response } from "express";
import { GameType } from "../types/game";
import gameServices from "../services/gameServices";

const router = Router();
router.post("/item/register", async (req: Request, res: Response) => {
    const game = {
        title: req.body.title,
        price: req.body.price,
        tags: req.body.tags,
        description: req.body.description,
        platform: req.body.platform,
        url: req.body.url,
    };

    const gameValidation = GameType.safeParse(game);
    if (!gameValidation.success) {
        return res.status(400).send({
            message: "Invalid game data",
            error: gameValidation.error,
        });
    }

    try {
        const result = await gameServices.createGame(gameValidation.data);
        res.status(201).send({
            message: "Game registered successfully",
            game: result.title,
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).send({
                    message: "Internal server error",
                    error: new Error("Game already registered").message,
                });
            } else {
                res.status(500).send({
                    message: "Unknown error",
                    error: err.message,
                });
            }
        } else {
            res.status(500).send({
                message: "Internal server error",
                error: err,
            });
        }
    }
});

router.delete("/item/delete", async (req: Request, res: Response) => {
    const title = req.body.title;

    try {
        const result = await gameServices.deleteGame(title);
        res.status(200).send({
            message: result,
            game: title,
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Game not found!") {
                res.status(404).send({
                    message: "Game not found",
                    error: err.message,
                });
            } else {
                res.status(500).send({
                    message: "Internal server error",
                    error: err.message,
                });
            }
        }
    }
});

export { router as gameRouter };
