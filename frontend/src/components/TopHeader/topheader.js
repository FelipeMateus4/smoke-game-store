import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Topheader.css";
import logoImg from "../../assets/da.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faInfoCircle, faHeadset, faUser } from "@fortawesome/free-solid-svg-icons";

function Cabecalho() {
    return (
        <div className="page-custom-background">
            <div className="container-fluid container-custom ">
                <img src={logoImg} className="img-fluid rounded-circle custom-logo" alt="Logo" />
                <p className="store-text">Smoke Games Store</p>
                <div className="classic">
                    <nav className="navbar navbar-expand-lg navbar-dark ">
                        <div className="collapse navbar-collapse navbar-custom" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <FontAwesomeIcon icon={faHome} /> Destaques
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <FontAwesomeIcon icon={faGamepad} /> Produtos
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/category1" className="dropdown-item">
                                            Categoria 1
                                        </Link>
                                        <Link to="/category2" className="dropdown-item">
                                            Categoria 2
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/category3" className="dropdown-item">
                                            Categoria 3
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">
                                        <FontAwesomeIcon icon={faInfoCircle} /> Sobre
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">
                                        <FontAwesomeIcon icon={faHeadset} /> Suporte
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="nav-links">
                    <Link to="/account/login" className="text-custom">
                        <FontAwesomeIcon icon={faUser} className="icon-spacing" />
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cabecalho;
