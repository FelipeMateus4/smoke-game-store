import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faInfoCircle, faHeadset, faUser } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css"; // Importando o arquivo de estilos CSS

function Header() {
    return (
        <Navbar expand="xl" variant="dark" className="navbar-custom">
            <Navbar.Brand as={Link} to="/" className="mr-auto">
                <FontAwesomeIcon icon={faHome} /> <span className="brand-text">Smoke Games Store</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon icon={faHome} /> Destaques
                    </Nav.Link>
                    <NavDropdown
                        title={
                            <>
                                <FontAwesomeIcon icon={faGamepad} /> Produtos
                            </>
                        }
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="/category1">
                            Categoria 1
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category2">
                            Categoria 2
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/category3">
                            Categoria 3
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/about">
                        <FontAwesomeIcon icon={faInfoCircle} /> Sobre
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact">
                        <FontAwesomeIcon icon={faHeadset} /> Suporte
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto mt-2">
                    <Nav.Link as={Link} to="/account/login">
                        <FontAwesomeIcon icon={faUser} /> Entrar
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
