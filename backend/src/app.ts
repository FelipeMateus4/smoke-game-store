import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes/routes";
import { authRouter } from "./routes/authLogin";
import session from "express-session";
import passport from "passport";

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(authRouter);

export default app;
