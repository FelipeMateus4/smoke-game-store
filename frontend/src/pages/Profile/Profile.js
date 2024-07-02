import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

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
            <div>
                <h1>Profile</h1>
                {userData ? (
                    <div>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
