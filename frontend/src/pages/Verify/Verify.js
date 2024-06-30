import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Verify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/HeaderMain/Header";

axios.defaults.baseURL = "http://localhost:5000"; // Defina a URL base do backend
axios.defaults.withCredentials = true; // Garante que cookies sejam enviados com cada requisição

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
        <div className="verify-page d-flex flex-column min-vh-100">
            <Header />
            <div className="container d-flex justify-content-center align-items-center verify-container">
                <h1 className="cooltext">Verify Code</h1>
                <div className="w-100">
                    {error && ( // Renderiza a div apenas se houver um erro
                        <div className="alert alert-info alert-danger custom-alert hi" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Verification Code</label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <div></div>
                        <button type="submit">Verify</button>
                    </form>
                </div>
            </div>
            <div className="footer-custom ">
                <Footer />
            </div>
        </div>
    );
};

export default Verify;
