import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Verify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/HeaderMain/Header";

axios.defaults.baseURL = "http://localhost:5000"; // Defina a URL base do backend
axios.defaults.withCredentials = true; // Garante que cookies sejam enviados com cada requisição

const Verify = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    return "Por favor, peça um novo código de verificação";
                }
            });
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
            // Mensagem de erro para exibir no frontend
            console.error(error);
            setError(error.response.data.message || "Unknown error");
        }
    };

    const handleResend = async () => {
        try {
            const response = await axios.get("/account/verify/resend");
            if (response.status === 200) {
                setError("Novo código enviado com sucesso");
                setTimer(60); // Reinicia o temporizador
            } else {
                setError(response.data.message || "Erro ao enviar novo código");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="verify-page d-flex flex-column min-vh-100">
            <Header />
            <div className="container d-flex justify-content-center align-items-center verify-container">
                <h1 className="cooltext">Seu código expira em:</h1>
                <p
                    className={`timer-text-custom ${
                        timer === "Por favor, peça um novo código de verificação" ? "highlight" : ""
                    }`}
                >
                    {timer}
                </p>
                <div className="w-100">
                    {error && (
                        <div className="alert alert-info alert-danger custom-alert" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="verification-designe">Inserir código:</label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <button id="submit-buttom-custom-verify" className="btn btn-primary" type="submit">
                            Enviar
                        </button>
                    </form>
                    <button onClick={handleResend} className="btn btn-secondary mt-3">
                        Reenviar
                    </button>
                </div>
            </div>
            <div className="footer-custom">
                <Footer />
            </div>
        </div>
    );
};

export default Verify;
