import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderMain/Header";
import "./Verify.css";
import Footer from "../../components/Footer/Footer";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const Verify = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/verify", { code });

            if (response.status === 200) {
                const redirectUrl = response.data.redirectUrl;
                navigate(redirectUrl);
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Unknown error");
        }
    };

    const handleResend = async () => {
        try {
            const response = await axios.get("/account/verify/resend");
            if (response.status === 200) {
                setError("Novo código enviado com sucesso");
                setTimer(60);
            } else {
                setError(response.data.message || "Erro ao enviar novo código");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="verify-page">
            <div className="container d-flex justify-content-center align-items-center verify-container">
                <div className="w-100">
                    <h1 className="text-center cooltext">Verificação</h1>
                    <p className="text-center timer-text">Seu código expira em: {timer} segundos</p>
                    {error && <p className="error-message">{error}</p>}
                    <form className="verify-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Insira o código:</label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                        </div>
                        <button
                            id="submit-buttom-custom-verify"
                            className="btn btn-primary w-100 mt-3 custom-button"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </form>
                    <button
                        id="submit-buttom-custom-resend"
                        className="btn btn-secondary w-100 mt-3 custom-button"
                        onClick={handleResend}
                    >
                        Reenviar Código
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Verify;
