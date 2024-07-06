import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Importe a função format de date-fns

axios.defaults.baseURL = "http://localhost:5000"; // Set the base URL for the backend

const Profile = () => {
    const { user, logout, login } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
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
            setDataNascimento(user.dataNascimento || "");
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
    //d
    const handleUpdate = async () => {
        try {
            const id = user.id;
            const updatedUser = {};

            updatedUser.id = id;
            if (username !== user.username) updatedUser.username = username;
            if (email !== user.email && email !== "") updatedUser.email = email;
            if (nome !== user.nome && nome !== "") updatedUser.nome = nome;
            if (sobrenome !== user.sobrenome && sobrenome !== "") updatedUser.sobrenome = sobrenome;
            if (cpf !== user.cpf && cpf !== "") updatedUser.cpf = cpf;
            if (telefone !== user.telefone && telefone !== "") updatedUser.telefone = telefone;
            if (dataNascimento !== user.dataNascimento && dataNascimento !== "")
                updatedUser.dataNascimento = dataNascimento;
            console.log(updatedUser);

            const response = await axios.put(`/account/profile/edit`, updatedUser); // Assumindo que o ID do usuário está no user.id
            if (response.status === 200) {
                login(response.data.user);
                alert("Perfil atualizado com sucesso!");
                // Atualizar os dados do contexto do usuário, se necessário
            }
        } catch (error) {
            alert(error.response.data.message || "Erro ao atualizar perfil");
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
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                    >
                                        {(inputProps) => <input {...inputProps} type="text" />}
                                    </InputMask>
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faPhone} className="User-icon" />
                                <p className="text-profile">
                                    <label>Telefone:</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                    >
                                        {(inputProps) => <input {...inputProps} type="text" />}
                                    </InputMask>
                                </p>
                            </div>
                            <div className="profile-User">
                                <FontAwesomeIcon icon={faUser} className="User-icon" />
                                <p className="text-profile">
                                    <label>Data de Nascimento:</label>
                                    <DatePicker
                                        selected={dataNascimento}
                                        onChange={(date) => setDataNascimento(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                        customInput={
                                            <InputMask
                                                mask="99/99/9999"
                                                value={dataNascimento ? format(dataNascimento, "dd/MM/yyyy") : ""}
                                                onChange={(e) => setDataNascimento(e.target.value)}
                                            >
                                                {(inputProps) => (
                                                    <input {...inputProps} type="text" className="form-control" />
                                                )}
                                            </InputMask>
                                        }
                                    />
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
                        onClick={handleUpdate}
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
