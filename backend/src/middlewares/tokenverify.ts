import { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/userModel";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
        return res.redirect("/account/login");
    }
    if (
        user.securityState === "none" ||
        user.securityState === "google-security" ||
        user.verified
    ) {
        return next();
    }
    return res.redirect("/account/login");
};

export { validateLogin };
