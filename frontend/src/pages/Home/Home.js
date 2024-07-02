import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/HeaderMain/Header";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
    // Estado para controlar os produtos exibidos
    const [currentProducts, setCurrentProducts] = useState([]);
    // Estado para controlar o índice do conjunto atual de produtos
    const [currentIndex, setCurrentIndex] = useState(0);

    // Arrays de produtos
    const productsSets = [
        [
            { id: 1, name: "Produto 1", description: "Descrição do produto 1", image: "../../assets/produto1.jpg" },
            { id: 2, name: "Produto 2", description: "Descrição do produto 2", image: "../../assets/produto2.jpg" },
            { id: 3, name: "Produto 3", description: "Descrição do produto 3", image: "../../assets/produto3.jpg" },
        ],
        [
            { id: 4, name: "Produto 4", description: "Descrição do produto 4", image: "../../assets/produto4.jpg" },
            { id: 5, name: "Produto 5", description: "Descrição do produto 5", image: "../../assets/produto5.jpg" },
            { id: 6, name: "Produto 6", description: "Descrição do produto 6", image: "../../assets/produto6.jpg" },
        ],
    ];

    // Efeito para alternar os produtos a cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }, 5000); // Alterna a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    // Atualiza os produtos exibidos com base no índice atual
    useEffect(() => {
        setCurrentProducts(productsSets[currentIndex]);
    }, [currentIndex]);

    return (
        <div className="home-background">
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
                        {currentProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <Link to={`/produtos/${product.id}`} className="btn-secondary">
                                    Saiba mais
                                </Link>
                            </div>
                        ))}
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
