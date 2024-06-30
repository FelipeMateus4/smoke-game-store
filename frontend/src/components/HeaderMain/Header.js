import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faInfoCircle, faHeadset, faUser } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Importa o arquivo CSS
import logo from "../../assets/da.jpg"; // Importa o logo da loja

const Header = () => {
    return (
        <Navbar expand="xl" className="navbar-custom">
            <Navbar.Brand as={Link} to="/">
                <img src={logo} height="40" className="d-inline-block align-top" alt="Loja Logo" /> SmokeGames Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav className="mx-auto mx-custom">
                    <Nav.Link as={Link} to="/destaques">
                        <FontAwesomeIcon icon={faHome} className="fa-icon" /> Destaques
                    </Nav.Link>
                    <NavDropdown
                        title={
                            <span>
                                <FontAwesomeIcon icon={faGamepad} className="fa-icon" /> Produtos
                            </span>
                        }
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="/produtos/categoria1">
                            Categoria 1
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/produtos/categoria2">
                            Categoria 2
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/produtos/categoria3">
                            Categoria 3
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/sobre">
                        <FontAwesomeIcon icon={faInfoCircle} className="fa-icon" /> Sobre
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contato">
                        <FontAwesomeIcon icon={faHeadset} className="fa-icon" /> Contato
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/account/login">
                        <FontAwesomeIcon icon={faUser} className="fa-icon" /> Entrar
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
