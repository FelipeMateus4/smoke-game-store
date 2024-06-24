import { GameType } from "../types/game";
import gameRepository from "../repositories/gamesRepository";

const createGame = async (game: GameType) => {
    try {
        const result = await gameRepository.register(game);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteGame = async (title: string) => {
    try {
        const result = await gameRepository.deleteGame(title);
        return result;
    } catch (error) {
        throw error;
    }
};

export default { createGame, deleteGame };
