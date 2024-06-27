import { UserType } from "../types/user";
import userRepository from "../repositories/userRepository";
import { sendTokenEmail } from "../utils/emailoptions";
import { generateToken } from "../utils/tokengen";
import userService from "../services/userService";

jest.mock("../repositories/userRepository");
jest.mock("../utils/emailoptions");
jest.mock("../utils/tokengen");

describe("Testes de UserService", () => {
    it("deve criar um usuário", async () => {
        const mockUser: UserType = {
            username: "test",
            password: "test123@",
            email: "foo@bar.com",
            verified: false,
            securityState: "none",
            allowsession: false,
            secret: "secret",
        };

        const token = "token";

        (userRepository.createUser as jest.Mock).mockReturnValue(mockUser);
        (generateToken as jest.Mock).mockReturnValue(token);
        (sendTokenEmail as jest.Mock).mockResolvedValue(true);

        const result = await userService.createUser(mockUser);
        expect(userRepository.createUser).toHaveBeenCalledWith(mockUser);
        expect(generateToken).toHaveBeenCalledWith(mockUser.email);
        expect(sendTokenEmail).toHaveBeenCalledWith(mockUser.email, token);
        expect(result).toEqual(mockUser);
    });

    it("deve retornar erro ao criar um usuário", async () => {
        const mockUser = {
            username: "test",
            password: "test123@",
            email: "foo@bar.com",
            verified: false,
            securityState: "none",
            allowsession: false,
            secret: "secret",
        };

        (userRepository.createUser as jest.Mock).mockRejectedValue(
            new Error("error")
        );

        await expect(userService.createUser(mockUser)).rejects.toThrowError(
            "error"
        );

        expect(userRepository.createUser).toHaveBeenCalledWith(mockUser);
    });

    it("deve encontrar um usuário pelo email", async () => {
        const email = "foo@bar.com";

        (userRepository.findEmail as jest.Mock).mockReturnValue(email);
    });

    it("deve retornar erro ao encontrar um usuário pelo email", async () => {
        const email = "foo@bar.com";

        (userRepository.findEmail as jest.Mock).mockRejectedValue(
            new Error("error")
        );

        await expect(userService.findByEmail(email)).rejects.toThrowError(
            "error"
        );
    });
});
