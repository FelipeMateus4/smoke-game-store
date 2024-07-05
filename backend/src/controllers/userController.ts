import { Router, Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import jwt, { verify } from "jsonwebtoken";
import { config } from "dotenv";
import passport from "../utils/passportoptions";
import { UserModel } from "../model/userModel";
import { ensureAuthenticated } from "../middlewares/protectedRoute";
import { passportGoogle } from "../utils/passportoauth2";
import speakeasy from "speakeasy";
import { UserType } from "../types/user";
import { validateLogin } from "../middlewares/tokenverify";
import { ValidationError } from "sequelize";
import { sendTokenEmailLogin } from "../utils/emailoptions";
import { authenticateToken } from "../utils/tokengen";

config();

const router = Router();

router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
        const secret = speakeasy.generateSecret({ length: 20 });
        const user: UserType = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            verified: false,
            secret: secret.base32,
            securityState: "none",
            allowsession: false,
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

router.delete(
    "/delete",
    ensureAuthenticated,
    validateLogin,
    async (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user;
        try {
            const result = await userService.deleteUser(user.email);
            res.status(200).send({
                message: result,
                user: user.username,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
            // Retorna um JSON com a URL de redirecionamento para falha
            return res.status(401).json({
                redirectUrl: "/account/login",
                message: info.message,
            });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            // Retorna um JSON com a URL de redirecionamento para sucesso
            return res.status(200).json({
                redirectUrl: "/account/verify",
                user: user,
            });
        });
    })(req, res, next);
});

router.post(
    "/logout",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: any = req.user;
            if (user.allowsession) {
                await UserModel.update(
                    { allowsession: false },
                    { where: { email: user.email } }
                );
            }

            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                return res
                    .status(200)
                    .send({ message: "Usuário deslogado com sucesso" });
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    "/verify",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        const { code } = req.body;
        const user: any = req.user;
        if (!user) {
            res.send("User not found!");
        }

        const secret: string = user.secret;
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: "base32",
            token: code,
            window: 2, // Permite uma janela de 1 intervalo (por exemplo, 30 segundos) para contornar pequenos atrasos
        });

        try {
            if (verified) {
                UserModel.update(
                    { allowsession: true }, // Os atributos que você quer atualizar
                    {
                        where: { email: user.email }, // A condição para encontrar o usuário
                    }
                );

                return res
                    .status(200)
                    .json({ redirectUrl: "/account/profile" });
            } else {
                return res.status(401).send({
                    message: "Código de verificação inválido ou expirado",
                });
            }
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/auth/google/callback",
    passportGoogle.authenticate("google", {
        failureRedirect: "/account/login",
    }),
    (req: Request, res: Response) => {
        res.redirect("/account/profile");
    }
);

router.get(
    "/verify/resend",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: any = req.user;
            if (!user) {
                console.log("User not found!");
                return res.status(404).send("User not found!");
            }

            const token = authenticateToken(user.secret);
            console.log(`Generated token: ${token}`);

            const emailSent = sendTokenEmailLogin(user.email, token);

            return res
                .status(200)
                .send({ message: "Código reenviado com sucesso" });
        } catch (error) {
            console.error("Error in resend route:", error);
            next(error);
        }
    }
);
//d
router.put(
    "/profile/edit",
    ensureAuthenticated,
    validateLogin,
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, nome, sobrenome, cpf, telefone, data } =
            req.body;
        const update = {
            username,
            email,
            nome,
            sobrenome,
            cpf,
            telefone,
            data,
        };
        try {
            const user = await userService.updateUser(update);
            return res.status(200).send({ message: "deu certo", user: user });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/profile",
    ensureAuthenticated,
    validateLogin,
    async (req, res, next: NextFunction) => {
        const user: any = req.user;

        if (!user) {
            res.send("User not found!");
        }

        try {
            const Resultuser = await userService.getUser(user.username);
            res.status(200).send({ user: Resultuser });
        } catch (error) {
            next(error);
        }
    }
);
export { router as userRouter };
