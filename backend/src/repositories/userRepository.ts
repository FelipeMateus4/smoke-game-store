import { UserModel } from "../model/userModel";
import { UserType } from "../types/user";

const createUser = async (user: UserType) => {
    try {
        await UserModel.sync();
        await UserModel.create(user);
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (email: string) => {
    try {
        const userForDelete = await UserModel.findOne({
            where: { email: email },
        });
        if (!userForDelete) {
            throw new Error("User not found");
        }
        await userForDelete.destroy();
        return "User deleted successfully!";
    } catch (error) {
        throw error;
    }
};
//d
const findEmail = async (email: string) => {
    try {
        const operationResult = await UserModel.findOne({
            where: { email: email },
        });
        if (!operationResult) {
            throw new Error("User not found");
        }
        operationResult.verified = true;
        operationResult.save();
        return operationResult;
    } catch (error) {
        throw error;
    }
};

const getUSer = async (username: string) => {
    try {
        const user = await UserModel.findOne({ where: { username: username } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (updates: any) => {
    try {
        const user: any = await UserModel.findByPk(updates.id);
        if (!user) {
            throw new Error("User not found");
        }

        Object.keys(updates).forEach((key) => {
            user[key] = updates[key] !== undefined ? updates[key] : user[key];
        });

        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};
export default { createUser, deleteUser, findEmail, getUSer, updateUser };
