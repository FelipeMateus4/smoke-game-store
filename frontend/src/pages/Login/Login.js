import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderMain/Header";
import "./Login.css";

axios.defaults.baseURL = "http://localhost:5000"; // Defina a URL base do backend
axios.defaults.withCredentials = true; // Garante que cookies sejam enviados com cada requisição

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/login", {
                username,
                password,
            });

            if (response.status === 200) {
                const redirectUrl = response.data.redirectUrl;
                const user = response.data.user;
                if (user.securityState === "none" || user.securityState === "google-security" || user.allowsession) {
                    navigate("/account/profile");
                } else {
                    navigate(redirectUrl);
                }
            } else if (response.status === 401) {
                const redirectUrl = response.data.redirectUrl;
                navigate(redirectUrl);
            }
        } catch (error) {
            if (error.response.data.message === "Missing credentials") {
                error.response.data.message = "Os campos de usuário e senha são obrigatórios.";
                setError(error.response.data); // Mensagem de erro para exibir no frontend
            }
            setError(error.response.data); // Mensagem de erro para exibir no frontend
        }
    };

    return (
        <div className="login-page">
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-container">
                <div className="w-100">
                    <h1 className="text-center mb-4">LOGIN</h1>
                    {error && <p>{error.message}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Usuário:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Senha:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span>Não possui uma conta?</span>
                            <a href="/account/register" className="text-decoration-none ml-2">
                                Registre-se
                            </a>
                        </div>
                        <button id="submit-buttom-custom-login" type="submit" className="btn btn-primary w-100 mt-3">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
