import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

axios.defaults.baseURL = "http://localhost:5000"; // Set the base URL for the backend

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Simulating fetching user data from context
                setUserData(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/logout");
            if (response.status === 200) {
                logout(); // Call the logout function from the context
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profile">
            <div className="profile-container">
                <h1 className="header-profile">PERFIL</h1>
                <div className="profile-place-img">
                    <img
                        src="https://istoe.com.br/wp-content/uploads/2023/08/felipe-neto.jpg?x56617"
                        className="img-fluid rounded-circle rounded-cir profile-image"
                        alt="Profile"
                    />
                </div>
                <div>
                    {userData ? (
                        <div className="profile-input-section">
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <span className="bold-text">Usuário:</span>
                                    {userData.username}
                                </p>
                            </div>
                            <div className="profile-Email">
                                <FontAwesomeIcon icon={faEnvelope} className="Email-icon" />
                                <p className="text-profile2">
                                    <span className="bold-text">Email:</span>
                                    {userData.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <button
                    id="submit-buttom-custom-editprofile"
                    type="button"
                    className=" btn btn-primary button-edit button-profile button-editor"
                >
                    Editar
                </button>
                <button
                    id="submit-buttom-custom-logout"
                    type="button"
                    className=" btn btn-secondary button-logout button-profile button-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
