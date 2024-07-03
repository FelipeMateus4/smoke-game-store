import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000"; // Set the base URL for the backend

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserData(user);
            setUsername(user.username);
            setEmail(user.email);
            setNome(user.nome || "");
            setSobrenome(user.sobrenome || "");
            setCpf(user.cpf || "");
            setTelefone(user.telefone || "");
            setData(user.data || "");
        }
    }, [user]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/account/logout");
            if (response.status === 200) {
                logout(); // chamada ao contexto de logout
                navigate("/");
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
                                    <label>Usuário:</label>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faEnvelope} className="User-icon" />
                                <p className="text-profile">
                                    <label>Email:</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <label>Nome:</label>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <label>Sobrenome:</label>
                                    <input
                                        type="text"
                                        value={sobrenome}
                                        onChange={(e) => setSobrenome(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <label>CPF:</label>
                                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faPhone} className="User-icon" />
                                <p className="text-profile">
                                    <label>Telefone:</label>
                                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <label>Data:</label>
                                    <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
                <div className="submit-buttoms-profile">
                    <button
                        id="submit-buttom-custom-editprofile"
                        type="button"
                        className="btn btn-primary button-edit button-profile button-editor"
                    >
                        Editar
                    </button>
                    <button
                        id="submit-buttom-custom-logout"
                        type="button"
                        className="btn btn-secondary button-logout button-profile button-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
