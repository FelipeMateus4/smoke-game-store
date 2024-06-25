import { sequelize } from "../connections/sequelize";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";

const passwordSchema = new PasswordValidator();
passwordSchema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase(1)
    .has()
    .lowercase()
    .has()
    .not()
    .spaces()
    .has()
    .symbols(1)
    .has()
    .digits(1);

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
            validate: {
                notEmpty: {
                    msg: "O nome de usuário não pode ser vazio",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 30],
                    msg: "A senha deve ter entre 8 e 30 caracteres",
                },
                isPasswordValid(value: string) {
                    if (!passwordSchema.validate(value)) {
                        throw new Error(
                            "A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 símbolo especial"
                        );
                    }
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "O email deve ser válido",
                },
            },
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
