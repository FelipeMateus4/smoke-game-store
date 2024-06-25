import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../model/userModel";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ where: { username } });

            if (!user || !user.comparePassword(password)) {
                return done(null, false, {
                    message: "Invalid username or password",
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findOne({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
