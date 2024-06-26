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

const findEmail = async (email: string) => {
    try {
        const operationResult: any = await UserModel.findOne({
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
export default { createUser, findEmail };
