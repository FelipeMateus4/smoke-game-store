import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Header from "../../components/HeaderMain/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";

axios.defaults.baseURL = "http://localhost:5000"; // Defina a URL base do backend

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/account/profile");
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile">
            <Header />
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
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
