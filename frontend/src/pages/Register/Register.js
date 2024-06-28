import React, { useState } from "react";
import { axios } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibir mensagem de erro */}
            </form>
        </div>
    );
};

export default Register;
