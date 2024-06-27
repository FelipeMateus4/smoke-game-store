import { GameType } from "../types/game";
import gameRepository from "../repositories/gamesRepository";
import gameServices from "../services/gameServices";

jest.mock("../repositories/gamesRepository");

describe("Testes de GameService", () => {
    it("deve criar um jogo", async () => {
        const mockGame: GameType = {
            title: "test",
            price: 100,
            tags: ["test"],
            description: "tessdsadasdt",
            platform: ["PS2"],
            url: "http://www.google.com",
        };

        (gameRepository.register as jest.Mock).mockReturnValue(mockGame);

        const result = await gameServices.createGame(mockGame);
        expect(gameRepository.register).toHaveBeenCalledWith(mockGame);
        expect(result).toEqual(mockGame);
    });

    it("deve deletar um jogo", async () => {
        const title = "test";

        (gameRepository.deleteGame as jest.Mock).mockReturnValue(title);

        const result = await gameServices.deleteGame(title);
        expect(gameRepository.deleteGame).toHaveBeenCalledWith(title);
        expect(result).toEqual(title);
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

        (gameRepository.register as jest.Mock).mockRejectedValue(
            new Error("error")
        );

        await expect(gameServices.createGame(mockGame)).rejects.toThrowError(
            "error"
        );

        expect(gameRepository.register).toHaveBeenCalledWith(mockGame);
    });

    it("deve retornar erro ao deletar um jogo", async () => {
        const title = "test";

        (gameRepository.deleteGame as jest.Mock).mockRejectedValue(
            new Error("error")
        );

        await expect(gameServices.deleteGame(title)).rejects.toThrowError(
            "error"
        );

        expect(gameRepository.deleteGame).toHaveBeenCalledWith(title);
    });
});
