import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

config();

export const generateToken = (email: string): string => {
    const secret = process.env.JWT_SECRET! || "";
    return jwt.sign({ email }, secret, {
        expiresIn: "1h",
    });
};
