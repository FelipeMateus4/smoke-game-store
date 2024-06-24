import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

config();

export const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
        algorithm: "RS256",
    });
};
