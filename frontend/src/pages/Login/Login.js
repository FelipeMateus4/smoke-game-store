import React, { useState } from "react";
import { axios } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

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
            setError(error.response.data);
            console.log(error.response.data); // Mensagem de erro para exibir no frontend
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error.message}</p>} {/* Exibe mensagem de erro se houver */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
