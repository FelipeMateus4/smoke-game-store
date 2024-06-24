import { sequelize } from "../connections/sequelize";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import e from "express";

class User extends Model {
    declare username: string;
    declare password: string;
    declare email: string;
    declare verified: boolean;

    public async comparePassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        schema: "public",
        hooks: {
            beforeCreate: async (user: User) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user: User) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
        },
    }
);

export { User as UserModel };
