import { Router, Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import passport from "../utils/passportoptions";
import { UserModel } from "../model/userModel";
import { ensureAuthenticated } from "../middlewares/protectedRoute";

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

router.get(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
        res.send("Login page");
    }
);

router.get(
    "/profile",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        // Verifica se req.user está definido e se tem a propriedade username
        if (!req.user || !("username" in req.user)) {
            return res.redirect("/login"); // Redireciona para o login se o usuário não estiver autenticado
        }

        // Tipagem segura: aqui estamos assumindo que req.user é do tipo User
        const user = req.user as UserModel;
        const username = user.username;

        // Renderiza a página de perfil
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Perfil do Usuário</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 50px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                p {
                    font-size: 18px;
                    line-height: 1.6;
                    color: #666;
                }
                .logout-btn {
                    display: block;
                    width: 120px;
                    margin: 20px auto;
                    padding: 10px;
                    text-align: center;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .logout-btn:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Perfil do Usuário</h1>
                <p>Olá, <strong>${username}</strong>!</p>
                <p>Você está logado com sucesso.</p>
                <a href="/account/login" class="logout-btn">Logout</a>
            </div>
        </body>
        </html>
    `);
    }
);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/account/profile",
        failureRedirect: "/account/login",
        failureFlash: true,
    })
);

export { router as userRouter };
