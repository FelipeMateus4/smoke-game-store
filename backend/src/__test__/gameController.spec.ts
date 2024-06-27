import request from "supertest";
import express from "express";
import { gameRouter } from "../controllers/gameController";
import gameServices from "../services/gameServices";
import { validateLogin } from "../middlewares/tokenverify";

jest.mock("../services/gameServices");
jest.mock("../middlewares/tokenverify", () => ({
    validateLogin: (req: any, res: any, next: any) => next(),
}));

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/game", gameRouter);

describe("Game Router", () => {
    describe("GET /register", () => {
        it("should return the registration form", async () => {
            const response = await request(app).get("/game/register");
            expect(response.status).toBe(200);
            expect(response.text).toContain(
                '<form action="/game/register" method="post">'
            );
        });
    });

    describe("POST /register", () => {
        it("should register a new game", async () => {
            const game = {
                title: "Test Game",
                price: 29.99,
                tags: "action,adventure",
                description: "Test description",
                platform: "PC",
                url: "http://example.com",
            };

            (gameServices.createGame as jest.Mock).mockResolvedValue(game);

            const response = await request(app)
                .post("/game/register")
                .send(game);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: "Game registered successfully",
                game: game.title,
            });
            expect(gameServices.createGame).toHaveBeenCalledWith(game);
        });

        it("should return an error if game registration fails", async () => {
            const game = {
                title: "Test Game",
                price: 29.99,
                tags: "action,adventure",
                description: "Test description",
                platform: "PC",
                url: "http://example.com",
            };

            (gameServices.createGame as jest.Mock).mockRejectedValue(
                new Error("Error creating game")
            );

            const response = await request(app)
                .post("/game/register")
                .send(game);

            expect(response.status).toBe(500);
        });
    });

    describe("DELETE /delete", () => {
        it("should delete a game", async () => {
            const title = "Test Game";

            (gameServices.deleteGame as jest.Mock).mockResolvedValue(
                "Game deleted successfully"
            );

            const response = await request(app)
                .delete("/game/delete")
                .send({ title });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Game deleted successfully",
                game: title,
            });
            expect(gameServices.deleteGame).toHaveBeenCalledWith(title);
        });

        it("should return an error if game deletion fails", async () => {
            const title = "Test Game";

            (gameServices.deleteGame as jest.Mock).mockRejectedValue(
                new Error("Error deleting game")
            );

            const response = await request(app)
                .delete("/game/delete")
                .send({ title });

            expect(response.status).toBe(500);
        });
    });
});
