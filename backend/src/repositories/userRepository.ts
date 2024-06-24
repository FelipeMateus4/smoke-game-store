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

export default { createUser };
