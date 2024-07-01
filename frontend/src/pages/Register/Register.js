import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderMain/Header";
import "./Register.css"; // Importe o arquivo CSS específico para Register

axios.defaults.baseURL = "http://localhost:5000"; // Defina a URL base do backend

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null); // Estado para armazenar o erro
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/register", {
                username,
                password,
                email,
            });

            if (response.data.message !== "User registered successfully") {
                navigate("/");
            } else {
                navigate("/account/login");
            }
        } catch (error) {
            console.error("Error registering:", error);
            setError(error.response.data.message || "Erro desconhecido ao registrar usuário");
        }
    };

    return (
        <div className="register-page">
            <Header />
            <div className="register-container">
                <h1>Register</h1>
                {error && <p style={{ color: "black" }}>{error}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Usuário</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Já possui uma conta?</span>
                        <a href="/account/login" className="text-decoration-none ml-2">
                            Login
                        </a>
                    </div>
                    <button id="submit-buttom-custom-register" type="submit" className="btn btn-primary w-100 mt-3">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
