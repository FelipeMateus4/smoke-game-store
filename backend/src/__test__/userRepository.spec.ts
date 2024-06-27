import { UserModel } from "../model/userModel";
import { UserType } from "../types/user";
import userRepository from "../repositories/userRepository";

jest.mock("../model/userModel");

describe("Testes de UserRepository", () => {
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

        (UserModel.sync as jest.Mock).mockResolvedValue(true);
        (UserModel.create as jest.Mock).mockReturnValue(mockUser);

        const result = await userRepository.createUser(mockUser);
        expect(UserModel.sync).toHaveBeenCalled();
        expect(UserModel.create).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockUser);
    });

    it("deve retornar erro ao criar um usuário", async () => {
        const mockUser: UserType = {
            username: "test",
            password: "test123@",
            email: "foo@bar.com",
            verified: false,
            securityState: "none",
            allowsession: false,
            secret: "secret",
        };

        (UserModel.sync as jest.Mock).mockRejectedValue(new Error("error"));

        await expect(userRepository.createUser(mockUser)).rejects.toThrowError(
            "error"
        );
        expect(UserModel.sync).toHaveBeenCalled();
    });

    it("deve encontrar um usuário pelo email", async () => {
        const mockUser: any = {
            id: 1,
            username: "test",
            password: "test123@",
            email: "foo@bar.com",
            verified: false,
            googleId: "",
            provider: "local",
            secret: "secret",
            securityState: "none",
            allowsession: false,
            createAt: new Date(),
            updateAt: new Date(),
            save: jest.fn().mockResolvedValue(true),
        };

        (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

        const result = await userRepository.findEmail(mockUser.email);
        expect(UserModel.findOne).toHaveBeenCalledWith({
            where: { email: mockUser.email },
        });
        expect(result.verified).toBe(true);
        expect(result.save).toHaveBeenCalled();
        expect(result).toEqual(mockUser);
    });
});
