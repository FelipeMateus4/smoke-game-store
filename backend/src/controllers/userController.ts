import { Router, Request, Response } from "express";
import { UserType } from "../types/user";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const router = Router();
router.post("/register", async (req: Request, res: Response) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        verified: false,
    };

    const userValidation = UserType.safeParse(user);

    if (!userValidation.success) {
        return res.status(400).send({
            message: "Invalid user data",
            error: userValidation.error,
        });
    }

    try {
        const result = await userService.createUser(userValidation.data);
        res.status(201).send({
            message: "User registered successfully",
            user: result.username,
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).send({
                    message: "Internal server error",
                    error: new Error("User already registered").message,
                });
            } else {
                res.status(500).send({
                    message: "Unknown error",
                    error: error.message,
                });
            }
        } else {
            res.status(500).send({
                message: "Internal server error",
                error,
            });
        }
    }
});

router.get("/register/authenticate", async (req: Request, res: Response) => {
    const token = req.query.token;
    if (!token) {
        return res
            .status(400)
            .send({ message: "error token not found,try again later" });
    }
    try {
        const decode: any = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string
        );
        const user = await userService.findByEmail(decode.email);
        res.status(201).send({
            message: "o usario esta verificado",
            user: user.username,
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "User not found") {
                res.status(404).send("o usuario nao foi encontrado");
            } else {
                res.status(500).send({
                    message: "Unknown error",
                    error: err.message,
                });
            }
        } else {
            res.status(500).send({
                message: "internal server error",
                error: err,
            });
        }
    }
});
export { router as userRouter };
