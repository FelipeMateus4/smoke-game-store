// Footer.js
import React from "react";
import "./Footer.css"; // Importa o arquivo CSS para estilização

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
                        <a href="/account/register" className="text-decoration-none ml-2">
                            Facebook
                        </a>

                        <li>Twitter</li>
                        <a href="https://www.instagram.com/felipeneto/?hl=pt-br" className="text-decoration-none ml-2">
                            instagram
                        </a>
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
