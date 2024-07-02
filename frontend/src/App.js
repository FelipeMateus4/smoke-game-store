// src/App.js
import React from "react";
import { Outlet } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/HeaderMain/Header";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <Outlet />
            </AuthProvider>
        </>
    );
}

export default App;
