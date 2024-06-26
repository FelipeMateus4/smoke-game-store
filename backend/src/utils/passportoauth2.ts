import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../model/userModel";
import { config } from "dotenv";

config();

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "764439856764-b3s3dtd6vqt9mqlj8nbbefeentpje6qi.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/account/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
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
