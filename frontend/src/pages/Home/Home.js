// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Bem-vindo ao Smoke Game Store</h1>
            <p>
                <Link to="/account/register">Registrar</Link> | <Link to="/account/login">Login</Link>
            </p>
        </div>
    );
};

export default Home;
