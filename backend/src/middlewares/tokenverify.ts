import { Request, Response, NextFunction } from "express";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
        return res.status(401).redirect("/account/login");
    }
    if (
        user.securityState === "none" ||
        user.securityState === "google-security" ||
        user.allowsession
    ) {
        return next();
    }
    return res.status(401).redirect("/account/login");
};

export { validateLogin };
