import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Institucional</h4>
                    <ul>
                        <li>Sobre</li>
                        <li>Carreiras</li>
                        <li>Seu jogo na Smoke</li>
                        <li>Smoke Co-op</li>
                        <li>Segurança</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Ajuda</h4>
                    <ul>
                        <li>Suporte</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Procon-Mg</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Siga a Smoke</h4>
                    <ul className="social-media">
                        <li>
                            <a href="/account/verify/resend" className="text-decoration-none ml-2">
                                Facebook
                            </a>
                        </li>
                        <li>Twitter</li>
                        <li>
                            <a
                                href="https://www.instagram.com/felipeneto/?hl=pt-br"
                                className="text-decoration-none ml-2"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>YouTube</li>
                        <li>Discord</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">&copy; 1988 - 2024 Smoke Ltda. Todos os direitos reservados.</div>
        </footer>
    );
};

export default Footer;
