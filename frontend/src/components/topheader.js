import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Topheader.css";
import logoImg from "../assets/logotipo-do-cigarro_10250-4155.jpg";
import { Link } from "react-router-dom";

function Cabecalho() {
    return (
        <div className="page-custom-background">
            <div className="container-fluid container-custom">
                <img src={logoImg} className="img-fluid rounded-circle custom-logo" alt="Logo" />
                <div className="nav-links">
                    <Link to="/account/register" className="text-custom">
                        Registrar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cabecalho;
