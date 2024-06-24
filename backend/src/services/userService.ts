import { UserType } from "../types/user";
import userRepository from "../repositories/userRepository";

const createUser = async (user: UserType) => {
    try {
        const result = await userRepository.createUser(user);
        return result;
    } catch (error) {
        throw error;
    }
};

export default { createUser };
