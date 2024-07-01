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
            <Footer />
            <p></p>
        </div>
    );
};

export default Home;
