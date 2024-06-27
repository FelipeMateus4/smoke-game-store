// import request from "supertest";
// import express, { NextFunction } from "express";
// import { userRouter } from "../controllers/userController";
// import userService from "../services/userService";
// import jwt from "jsonwebtoken";
// import passport from "passport";
// import { UserModel } from "../model/userModel";
// import speakeasy from "speakeasy";

// jest.mock("../services/userService");
// jest.mock("jsonwebtoken");
// jest.mock("passport");
// jest.mock("passport-google-oauth20");
// jest.mock("../model/userModel");
// jest.mock("speakeasy");

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use("/account", userRouter);

// describe("User Router", () => {
//     beforeEach(() => {
//         jest.resetAllMocks();
//     });

//     describe("POST /register", () => {
//         it("should register a new user", async () => {
//             const user = {
//                 username: "testuser",
//                 password: "testpassword",
//                 email: "test@example.com",
//             };

//             (userService.createUser as jest.Mock).mockResolvedValue(user);

//             const response = await request(app)
//                 .post("/account/register")
//                 .send(user);

//             expect(response.status).toBe(201);
//             expect(response.body).toEqual({
//                 message: "User registered successfully",
//                 user: user.username,
//             });
//             expect(userService.createUser).toHaveBeenCalledWith(
//                 expect.objectContaining(user)
//             );
//         });

//         it("should return an error if user registration fails", async () => {
//             const user = {
//                 username: "testuser",
//                 password: "testpassword",
//                 email: "test@example.com",
//             };

//             (userService.createUser as jest.Mock).mockRejectedValue(
//                 new Error("Error creating user")
//             );

//             const response = await request(app)
//                 .post("/account/register")
//                 .send(user);

//             expect(response.status).toBe(500);
//         });
//     });

//     describe("GET /register/authenticate", () => {
//         it("should authenticate user with valid token", async () => {
//             const token = "validtoken";
//             const decodedToken = { email: "test@example.com" };
//             const user = { username: "testuser", email: "test@example.com" };

//             (jwt.verify as jest.Mock).mockReturnValue(decodedToken);
//             (userService.findByEmail as jest.Mock).mockResolvedValue(user);

//             const response = await request(app)
//                 .get("/account/register/authenticate")
//                 .query({ token });

//             expect(response.status).toBe(201);
//             expect(response.body).toEqual({
//                 message: "O usuário foi verificado com sucesso.",
//                 user: user.username,
//             });
//             expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
//             expect(userService.findByEmail).toHaveBeenCalledWith(
//                 decodedToken.email
//             );
//         });

//         it("should return an error if token is invalid", async () => {
//             const token = "invalidtoken";

//             (jwt.verify as jest.Mock).mockImplementation(() => {
//                 throw new Error("Invalid token");
//             });

//             const response = await request(app)
//                 .get("/account/register/authenticate")
//                 .query({ token });

//             expect(response.status).toBe(500);
//         });
//     });

//     describe("GET /login", () => {
//         it("should return the login page", async () => {
//             const response = await request(app).get("/account/login");

//             expect(response.status).toBe(200);
//             expect(response.text).toContain(
//                 '<form action="/account/login" method="post">'
//             );
//         });
//     });

//     describe("GET /profile", () => {
//         it("should return user profile if authenticated", async () => {
//             const user = { username: "testuser" };

//             const mockEnsureAuthenticated = jest.fn((req, res, next) => {
//                 req.user = user;
//                 next();
//             });

//             app.use((req, res, next) => {
//                 req.user = user;
//                 next();
//             });
//             app.use("/account/profile", mockEnsureAuthenticated);

//             const response = await request(app).get("/account/profile");

//             expect(response.status).toBe(200);
//             expect(response.text).toContain(
//                 `Olá, <strong>${user.username}</strong>!`
//             );
//         });

//         it("should redirect to login if not authenticated", async () => {
//             const response = await request(app).get("/account/profile");

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/login");
//         });
//     });

//     describe("POST /login", () => {
//         it("should login user with valid credentials", async () => {
//             const user = { username: "testuser", password: "testpassword" };

//             (passport.authenticate as jest.Mock).mockImplementation(
//                 (strategy, options, callback) => {
//                     return (req: any, res: Response, next: NextFunction) => {
//                         req.login(user, () => {});
//                         callback(null, user);
//                     };
//                 }
//             );

//             const response = await request(app)
//                 .post("/account/login")
//                 .send(user);

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/verify");
//         });

//         it("should fail login with invalid credentials", async () => {
//             (passport.authenticate as jest.Mock).mockImplementation(
//                 (strategy, options, callback) => {
//                     return (
//                         req: Request,
//                         res: Response,
//                         next: NextFunction
//                     ) => {
//                         callback(null, false, {
//                             message: "Invalid credentials",
//                         });
//                     };
//                 }
//             );

//             const response = await request(app)
//                 .post("/account/login")
//                 .send({ username: "invaliduser", password: "invalidpassword" });

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/login");
//         });
//     });

//     describe("POST /logout", () => {
//         it("should logout user and redirect to login", async () => {
//             const user = { email: "test@example.com", allowsession: true };

//             (UserModel.update as jest.Mock).mockResolvedValue([1]);

//             const response = await request(app)
//                 .post("/account/logout")
//                 .send({ user });

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/login");
//         });
//     });

//     describe("POST /verify", () => {
//         it("should verify user with valid code", async () => {
//             const user = {
//                 email: "test@example.com",
//                 secret: "secret",
//                 allowsession: false,
//             };

//             app.use((req, res, next) => {
//                 req.user = user;
//                 next();
//             });

//             (speakeasy.totp.verify as jest.Mock).mockReturnValue(true);
//             (UserModel.update as jest.Mock).mockResolvedValue([1]);

//             const response = await request(app)
//                 .post("/account/verify")
//                 .send({ code: "validcode" });

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/profile");
//         });

//         it("should fail verification with invalid code", async () => {
//             const user = {
//                 email: "test@example.com",
//                 secret: "secret",
//                 allowsession: false,
//             };

//             app.use((req, res, next) => {
//                 req.user = user;
//                 next();
//             });

//             (speakeasy.totp.verify as jest.Mock).mockReturnValue(false);

//             const response = await request(app)
//                 .post("/account/verify")
//                 .send({ code: "invalidcode" });

//             expect(response.status).toBe(401);
//             expect(response.body).toEqual({
//                 message: "Código de verificação inválido ou expirado",
//             });
//         });
//     });

//     describe("GET /verify", () => {
//         it("should redirect to profile if user is already verified", async () => {
//             const user = { securityState: "none", allowsession: true };

//             app.use((req, res, next) => {
//                 req.user = user;
//                 next();
//             });

//             const response = await request(app).get("/account/verify");

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/profile");
//         });

//         it("should return verification page if user is not verified", async () => {
//             const user = { securityState: "pending", allowsession: false };

//             app.use((req, res, next) => {
//                 req.user = user;
//                 next();
//             });

//             const response = await request(app).get("/account/verify");

//             expect(response.status).toBe(200);
//             expect(response.text).toContain(
//                 "Insira o código de verificação enviado para o seu e-mail"
//             );
//         });
//     });

//     describe("GET /auth/google", () => {
//         it("should initiate Google OAuth flow", async () => {
//             (passport.authenticate as jest.Mock).mockReturnValue(
//                 (req: Request, res: any, next: NextFunction) => {
//                     res.redirect("/account/auth/google/callback");
//                 }
//             );

//             const response = await request(app).get("/account/auth/google");

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe(
//                 "/account/auth/google/callback"
//             );
//         });
//     });

//     describe("GET /auth/google/callback", () => {
//         it("should handle Google OAuth callback", async () => {
//             const user = { username: "testuser", email: "test@example.com" };

//             (passport.authenticate as jest.Mock).mockImplementation(
//                 (strategy, options, callback) => {
//                     return (req: any, res: Response, next: NextFunction) => {
//                         req.login(user, () => {});
//                         callback(null, user);
//                     };
//                 }
//             );

//             const response = await request(app).get(
//                 "/account/auth/google/callback"
//             );

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/profile");
//         });

//         it("should handle Google OAuth callback failure", async () => {
//             (passport.authenticate as jest.Mock).mockImplementation(
//                 (strategy, options, callback) => {
//                     return (
//                         req: Request,
//                         res: Response,
//                         next: NextFunction
//                     ) => {
//                         callback(null, false, { message: "OAuth failed" });
//                     };
//                 }
//             );

//             const response = await request(app).get(
//                 "/account/auth/google/callback"
//             );

//             expect(response.status).toBe(302);
//             expect(response.headers.location).toBe("/account/login");
//         });
//     });
// });
