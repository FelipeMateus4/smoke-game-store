import { UserType } from "../types/user";
import userRepository from "../repositories/userRepository";
import { sendTokenEmail } from "../utils/emailoptions";
import { generateToken } from "../utils/tokengen";

const createUser = async (user: UserType) => {
    try {
        const result = await userRepository.createUser(user);
        const token = generateToken(user.email);
        await sendTokenEmail(user.email, token);
        return result;
    } catch (error) {
        throw error;
    }
};

const findByEmail = async (email: string) => {
    try {
        const result = await userRepository.findEmail(email);
        return result;
    } catch (error) {
        throw error;
    }
};

export default { createUser };
