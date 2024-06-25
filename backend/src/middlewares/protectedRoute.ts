import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).redirect("/account/login");
}
export { ensureAuthenticated };
