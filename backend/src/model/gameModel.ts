import { sequelize } from "../connections/sequelize";
import { DataTypes, Model } from "sequelize";

class Game extends Model {
    declare title: string;
    declare price: number;
    declare tags: string[];
    declare description: string;
    declare platform: string[];
    declare url: string | null;
}

Game.init(
    {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O título não pode ser vazio",
                },
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    msg: "O preço deve ser um número",
                },
            },
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                isTags(value: string[]) {
                    value.forEach((tag) => {
                        if (tag.length < 3) {
                            throw new Error(
                                "As tags devem ter no mínimo 3 caracteres"
                            );
                        }
                    });
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 5000],
                    msg: "A descrição deve ter entre 10 e 5000 caracteres",
                },
            },
        },
        platform: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                isPlatform(value: string[]) {
                    const platforms = [
                        "PC",
                        "PS2",
                        "PS3",
                        "PS4",
                        "PS5",
                        "Xbox One",
                        "Xbox Series X",
                        "Xbox Series S",
                        "Nintendo Wii",
                        "Nintendo Wii U",
                        "Nintendo 3DS",
                        "Nintendo DS",
                        "Nintendo DSi",
                        "Xbox 360",
                        "Nintendo Switch",
                    ];
                    value.forEach((platform) => {
                        if (!platforms.includes(platform)) {
                            throw new Error("Plataforma inválida");
                        }
                    });
                },
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: "A URL deve ser válida",
                },
            },
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
