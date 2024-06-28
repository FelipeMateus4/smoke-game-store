import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Game from "../pages/Game/Game";
import Verify from "../pages/Verify/Verify";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "account/register", element: <Register /> },
            { path: "account/login", element: <Login /> },
            { path: "/account/verify", element: <Verify /> },
            { path: "/account/profile", element: <Profile /> },
            {
                path: "game",
                element: (
                    <PrivateRoute>
                        <Game />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
