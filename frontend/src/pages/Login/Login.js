import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Login</h1>
            {error && <p>{error.message}</p>} {/* Exibe mensagem de erro se houver */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Não possui uma conta?</label>
                    <a href="/account/login">Registre-se</a>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
