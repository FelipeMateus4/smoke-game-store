import { GameModel } from "../model/gameModel";
import { GameType } from "../types/game";

const register = async (game: GameType) => {
    try {
        await GameModel.sync();
        await GameModel.create(game);
        return game;
    } catch (error) {
        throw error;
    }
};

const deleteGame = async (title: string) => {
    try {
        const result = await GameModel.destroy({ where: { title } });
        if (result === 0) {
            throw new Error("Game not found!");
        }
        return "Game deleted successfully!";
    } catch (error) {
        throw error;
    }
};

export default { register, deleteGame };
