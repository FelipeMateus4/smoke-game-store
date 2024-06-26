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

export const authenticateToken = (secret: string) => {
    const token = speakeasy.totp({
        secret: secret,
        encoding: "base32",
    });

    return token;
};
