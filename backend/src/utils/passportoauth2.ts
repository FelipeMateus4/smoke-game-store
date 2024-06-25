import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import { UserModel } from "../model/userModel";

// Estruturação da estratégia OAuth 2.0
passport.use(
    new OAuth2Strategy(
        {
            authorizationURL: "https://accounts.google.com/o/oauth2/auth",
            tokenURL: "https://oauth2.googleapis.com/token",
            clientID: "YOUR_GOOGLE_CLIENT_ID",
            clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
            callbackURL: "http://localhost:3000/auth/callback",
            scope: ["profile", "email"], // Solicitando escopos de perfil e email
        },
        async function (
            accessToken: any,
            refreshToken: any,
            profile: any,
            done: any
        ) {
            try {
                // O Google retorna o perfil no formato a seguir
                const googleProfile = profile._json;

                const user = await UserModel.findOne({
                    where: { oauthId: googleProfile.email },
                });

                if (!user) {
                    const newUser = await UserModel.create({
                        username: googleProfile.name,
                        email: googleProfile.email,
                        oauthId: googleProfile.password,
                    });
                    return done(null, newUser);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialização e desserialização do usuário
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
