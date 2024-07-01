// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/HeaderMain/Header";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-background">
            <Header />
            <main className="content">
                <section className="welcome-section">
                    <h1>Bem-vindo à Smoke Game Store</h1>
                    <p>A melhor loja para encontrar todos os seus jogos favoritos e acessórios!</p>
                    <Link to="/produtos" className="btn-primary">
                        Veja nossos produtos
                    </Link>
                </section>
                <section className="featured-products">
                    <h2>Produtos em Destaque</h2>
                    <div className="product-cards">
                        <div className="product-card">
                            <img src="../../assets/produto1.jpg" alt="Produto 1" />
                            <h3>Produto 1</h3>
                            <p>Descrição do produto 1.</p>
                            <Link to="/produtos/1" className="btn-secondary">
                                Saiba mais
                            </Link>
                        </div>
                        <div className="product-card">
                            <img src="../../assets/produto2.jpg" alt="Produto 2" />
                            <h3>Produto 2</h3>
                            <p>Descrição do produto 2.</p>
                            <Link to="/produtos/2" className="btn-secondary">
                                Saiba mais
                            </Link>
                        </div>
                        <div className="product-card">
                            <img src="../../assets/produto3.jpg" alt="Produto 3" />
                            <h3>Produto 3</h3>
                            <p>Descrição do produto 3.</p>
                            <Link to="/produtos/3" className="btn-secondary">
                                Saiba mais
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="about-section">
                    <h2>Sobre Nós</h2>
                    <p>
                        Somos uma loja dedicada a fornecer a melhor experiência de compra para os amantes de jogos. Aqui
                        você encontra uma ampla variedade de jogos, consoles e acessórios para todos os gostos e idades.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
