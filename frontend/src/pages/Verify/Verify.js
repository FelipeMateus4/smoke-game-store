import React, { useState } from "react";
import { axios } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/verify", { code });

            if (response.status === 200) {
                const redirectUrl = response.data.redirectUrl;
                navigate(redirectUrl);
            }
        } catch (error) {
            // Mensagem de erro para exibir no frontend
            console.error(error);
            setError(error.response.data.message || "Unknown error");
        }
    };

    return (
        <div>
            <h1>Verify Code</h1>
            {error && <p>{error}</p>} {/* Exibe mensagem de erro se houver */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Verification Code</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default Verify;
