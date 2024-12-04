import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Usando NavLink e useNavigate
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Verifica se o usuário está logado (se o token estiver presente no localStorage)
    const isLoggedIn = localStorage.getItem('token') !== null;

    // Verifica o tipo de usuário (hospital ou paciente) armazenado no localStorage
    const userType = localStorage.getItem('userType');

    // Função para deslogar (limpar o token do localStorage)
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');  // Remove o tipo de usuário
        navigate('/login');  // Redireciona para a página de login após logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">Hospitime</NavLink>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink to="/" className="navbar-link">Home</NavLink>
                    </li>
                    
                    {/* <li className="navbar-item">
                        <NavLink to="/profile" className="navbar-link">Meu perfil</NavLink>
                    </li> */}

                    {/* Verifica se o usuário está logado */}
                    {isLoggedIn ? (
                        <>
                            {/* Exibe "Meu perfil" para qualquer tipo de usuário */}
                            {userType === 'pacient' && (
                                <li className="navbar-item">
                                    <NavLink to="/profile" className="navbar-link">Meu perfil</NavLink>
                                </li>
                            )}

                            {/* Se o usuário for hospital, exibe a opção de gerenciar hospitais */}
                            {userType === 'hospital' && (
                                <li>
                                    <NavLink to="/hosp" className="navbar-link">Gerenciar Hospitais</NavLink>
                                </li>
                            )}

                            {/* Exibe o botão de logout */}
                            <li className="navbar-item">
                                <NavLink className="navbar-link" onClick={handleLogout} to="/login">Sair</NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <NavLink to="/login" className="navbar-link">Login</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
