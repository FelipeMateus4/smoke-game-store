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
                        <li>Seu jogo na Nuuvem</li>
                        <li>Nuuvem Co-op</li>
                        <li>Segurança</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Ajuda</h4>
                    <ul>
                        <li>Suporte</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Procon-RJ</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Siga a Nuuvem</h4>
                    <ul className="social-media">
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>YouTube</li>
                        <li>Discord</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">&copy; 2011 - 2024 Nuuvem Ltda. Todos os direitos reservados.</div>
        </footer>
    );
};

export default Footer;
