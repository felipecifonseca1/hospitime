import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import profileImage from 'frontend/src/assets/images/perfil.png'; // Caminho da imagem

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        health_plan: '',
        address: '',
        profile_picture: ''  // Supondo que o perfil tenha um campo para a foto
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Carregar os dados do perfil
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Você precisa estar autenticado para acessar esta página.');
                    return;
                }

                const response = await axios.get('http://localhost:8000/acc/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                setError('Erro ao carregar os dados do perfil');
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8000/acc/profile/', profileData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Perfil atualizado com sucesso!');
            setIsEditing(false);
        } catch (error) {
            setError('Erro ao salvar os dados do perfil');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>Perfil de Usuário</h2>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}

                <div className="profile-header">
                    {/* Exibindo a imagem do perfil */}
                    <div className="profile-img">
                        <img
                            src={profileData.profile_picture || profileImage} // Usando a imagem do perfil ou uma imagem padrão
                            alt="Foto do Perfil"
                        />
                    </div>

                    <div className="profile-info">
                        <div className="input-group">
                            <label>Nome de Usuário:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.username}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Nome:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="first_name"
                                    value={profileData.first_name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.first_name}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Sobrenome:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="last_name"
                                    value={profileData.last_name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.last_name}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.email}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Data de Nascimento:</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={profileData.birth_date}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.birth_date || 'Não informado'}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Convênio de Saúde:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="health_plan"
                                    value={profileData.health_plan}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.health_plan || 'Não informado'}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Endereço:</label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profileData.address || 'Não informado'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className="actions">
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                    </div>
                ) : (
                    <button onClick={handleEditClick}>Editar</button>
                )}

                {/* Botão de Logout */}
                {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    );
};

export default Profile;