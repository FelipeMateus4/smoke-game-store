import { Router, Request, Response, NextFunction } from "express";
import { UserType } from "../types/user";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import passport from "../utils/passportoptions";

config();

const router = Router();
router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            verified: false,
        };

        //const userValidation = UserType.safeParse(user);

        // if (!userValidation.success) {
        //     return res.status(400).send({
        //         message: "Invalid user data",
        //         error: userValidation.error,
        //     });
        // }

        try {
            const result = await userService.createUser(user);
            res.status(201).send({
                message: "User registered successfully",
                user: result.username,
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get(
    "/register/authenticate",
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.query.token;
        if (!token) {
            return res
                .status(400)
                .send({ message: "Token not found,try again later." });
        }
        try {
            const decode: any = jwt.verify(
                token as string,
                process.env.JWT_SECRET as string
            );
            const user = await userService.findByEmail(decode.email);
            res.status(201).send({
                message: "O usuário foi verificado com sucesso.",
                user: user.username,
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/item/register",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

export { router as userRouter };
