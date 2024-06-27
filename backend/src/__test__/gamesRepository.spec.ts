import { GameModel } from "../model/gameModel";
import { GameType } from "../types/game";
import gamesRepository from "../repositories/gamesRepository";

jest.mock("../model/gameModel");

describe("Testes de GamesRepository", () => {
    it("deve criar um jogo", async () => {
        const mockGame: GameType = {
            title: "test",
            price: 100,
            tags: ["test"],
            description: "tessdsadasdt",
            platform: ["PS2"],
            url: "http://www.google.com",
        };

        (GameModel.sync as jest.Mock).mockResolvedValue(true);
        (GameModel.create as jest.Mock).mockReturnValue(mockGame);

        const result = await gamesRepository.register(mockGame);
        expect(GameModel.sync).toHaveBeenCalled();
        expect(GameModel.create).toHaveBeenCalledWith(mockGame);
        expect(result).toEqual(mockGame);
    });

    it("deve retornar erro ao criar um jogo", async () => {
        const mockGame = {
            title: "test",
            price: 100,
            tags: ["test"],
            description: "tessdsadasdt",
            platform: ["PS2"],
            url: "https://www.google.com",
        };

        (GameModel.sync as jest.Mock).mockRejectedValue(new Error("error"));

        await expect(gamesRepository.register(mockGame)).rejects.toThrowError(
            "error"
        );

        expect(GameModel.sync).toHaveBeenCalled();
    });

    it("deve deletar um jogo", async () => {
        const title = "test";

        (GameModel.destroy as jest.Mock).mockResolvedValue(1);

        const result = await gamesRepository.deleteGame(title);
        expect(GameModel.destroy).toHaveBeenCalledWith({ where: { title } });
        expect(result).toEqual("Game deleted successfully!");
    });

    it("deve retornar erro ao deletar um jogo", async () => {
        const title = "test";

        (GameModel.destroy as jest.Mock).mockResolvedValue(0);

        await expect(gamesRepository.deleteGame(title)).rejects.toThrowError(
            "Game not found!"
        );

        expect(GameModel.destroy).toHaveBeenCalledWith({ where: { title } });
    });
});
