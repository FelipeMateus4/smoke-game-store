import { Router, Request, Response, NextFunction } from "express";
import { GameType } from "../types/game";
import gameServices from "../services/gameServices";

const router = Router();

router.get("/register", async (req: Request, res: Response) => {
    res.send(`<form action="/game/register" method="post">
    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>
    </div>
    <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" required step="0.01" min="0">
    </div>
    <div class="form-group">
        <label for="tags">Tags (comma separated):</label>
        <input type="text" id="tags" name="tags" required>
    </div>
    <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" name="description" rows="4" required></textarea>
    </div>
    <div class="form-group">
        <label for="platform">Platform (comma separated):</label>
        <input type="text" id="platform" name="platform" required>
    </div>
    <div class="form-group">
        <label for="url">URL:</label>
        <input type="url" id="url" name="url">
    </div>
    <div class="form-group">
        <button type="submit">Register Game</button>
    </div>
</form>`);
});

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
