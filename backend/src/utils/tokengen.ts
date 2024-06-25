import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
import speakeasy from "speakeasy";

config();

export const generateToken = (email: string): string => {
    const secret = process.env.JWT_SECRET! || "";
    return jwt.sign({ email }, secret, {
        expiresIn: "1h",
    });
};

export const authenticateToken = () => {
    const secret = speakeasy.generateSecret({ length: 20 });

    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
    });

    return token;
};
