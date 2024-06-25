import { Router, Request, Response, NextFunction } from "express";
import { GameType } from "../types/game";
import gameServices from "../services/gameServices";

const router = Router();
router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
        const game: GameType = {
            title: req.body.title,
            price: req.body.price,
            tags: req.body.tags,
            description: req.body.description,
            platform: req.body.platform,
            url: req.body.url,
        };

        // const gameValidation = GameType.safeParse(game);
        // if (!gameValidation.success) {
        //     return res.status(400).send({
        //         message: "Invalid game data",
        //         error: gameValidation.error,
        //     });
        // }

        try {
            const result = await gameServices.createGame(game);
            res.status(201).send({
                message: "Game registered successfully",
                game: result.title,
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/delete",
    async (req: Request, res: Response, next: NextFunction) => {
        const title = req.body.title;

        try {
            const result = await gameServices.deleteGame(title);
            res.status(200).send({
                message: result,
                game: title,
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router as gameRouter };
