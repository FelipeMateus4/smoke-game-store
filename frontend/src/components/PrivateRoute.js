import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? children : <Navigate to="/account/login" />;
};

export default PrivateRoute;
