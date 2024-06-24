import { sequelize } from "../connections/sequelize";
import { DataTypes, Model } from "sequelize";

class Game extends Model {
    declare title: string;
    declare price: number;
    declare tags: string[];
    declare description: string;
    declare platform: string[];
    declare url: string;
    declare verify: boolean;
}

Game.init(
    {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platform: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        verify: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "Game",
        tableName: "games",
        schema: "public",
    }
);

export { Game as GameModel };
