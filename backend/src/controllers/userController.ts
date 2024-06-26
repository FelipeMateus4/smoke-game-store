import { Router, Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import passport from "../utils/passportoptions";
import { UserModel } from "../model/userModel";
import { ensureAuthenticated } from "../middlewares/protectedRoute";
import { passportGoogle } from "../utils/passportoauth2";
import { authenticateToken } from "../utils/tokengen";
import speakeasy from "speakeasy";
import { UserType } from "../types/user";
import { where } from "sequelize";

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
        const errorMessages: any = req.flash("error"); // Certifique-se de que está tipado corretamente
        const errorMessageHtml =
            errorMessages.length > 0
                ? `<div class="error">${errorMessages.join("<br>")}</div>`
                : "";

        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css"> <!-- Link to your CSS file -->
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        ${errorMessageHtml}
        <form action="/account/login" method="post">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
            <div class="form-group">
                <p>Don't have an account? <a href="/account/register">Register here</a></p>
            </div>
            <div class="form-group">
                <p>Or login with:</p>
                <a href="/account/auth/google">Google</a>
            </div>
        </form>
    </div>
</body>
</html>
`);
    }
);

router.get(
    "/profile",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
        // Verifica se req.user está definido e se tem a propriedade username
        if (!req.user || !("username" in req.user)) {
            return res.redirect("/account/login"); // Redireciona para o login se o usuário não estiver autenticado
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
                <form action="/account/logout" method="post">
                    <button type="submit" class="logout-btn">Logout</button>
                </form>
            </div>
        </body>
        </html>
    `);
    }
);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/account/verify",
        failureRedirect: "/account/login",
        failureFlash: true,
    })
);

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/account/login");
    });
});

router.post("/verify", ensureAuthenticated, async (req, res) => {
    const { code } = req.body;
    const user: any = req.user;
    if (!user) {
        res.send("aabababa");
    }
    const secret: string = user.secret;
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: code,
        window: 2, // Permite uma janela de 1 intervalo (por exemplo, 30 segundos) para contornar pequenos atrasos
    });

    if (verified) {
        res.redirect("/account/profile");
    } else {
        return res
            .status(401)
            .send({ message: "Código de verificação inválido ou expirado" });
    }
});
router.get("/verify", (req: Request, res: Response) => {
    res.send(`<!-- views/verify.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title>Verificação de Código</title>
</head>
<body>
    <h1>Insira o código de verificação enviado para o seu e-mail</h1>
    <form action="/account/verify" method="post">
        <input type="text" name="code" placeholder="Código de verificação" required>
        <button type="submit">Verificar</button>
    </form>
    <% if (messages.error) { %>
        <p><%= messages.error %></p>
    <% } %>
</body>
</html>)
}`);
});

router.get(
    "/auth/google",
    passportGoogle.authenticate("google", { scope: ["profile", "email"] })
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

export { router as userRouter };
