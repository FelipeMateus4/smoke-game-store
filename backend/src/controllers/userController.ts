import { Router, Request, Response } from "express";
import { UserType } from "../types/user";
import userService from "../services/userService";

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

export { router as userRouter };
