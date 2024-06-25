import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import flash from "express-flash";
import { routes } from "./routes/routes";
import { authRouter } from "./routes/authLogin";

const app = express();

// Middleware
app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração do express-session
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para mensagens flash
// app.use(flash());

// Rotas
app.use(routes);
app.use(authRouter);

//Manipulador de erro para mensagens flash
// app.use((err: any, req: Request, res: Response, next: Function) => {
//     if (err) {
//         req.flash("error", err.message); // Enviar mensagem flash de erro
//         res.redirect("/account/login"); // Redirecionar de volta para a página de login
//     }
// });

// // Rota de erro para lidar com rotas inexistentes
// app.use((req: Request, res: Response) => {
//     res.status(404).send("Rota não encontrada!");
// });

export default app;
