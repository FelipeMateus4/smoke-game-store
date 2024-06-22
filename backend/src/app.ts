import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes/routes";

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

export default app;
