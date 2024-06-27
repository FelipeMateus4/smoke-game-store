import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../model/userModel";
import { config } from "dotenv";

config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: "http://localhost:3000/account/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            await UserModel.sync();
            try {
                let user = await UserModel.findOne({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    user = await UserModel.create({
                        username: profile.displayName,
                        email: profile.emails![0].value,
                        googleId: profile.id,
                        provider: "google",
                        verified: true,
                        securityState: "google-security",
                        allowsession: true,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        const user = await UserModel.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export { passport as passportGoogle };
