import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';  // Usando NavLink e useNavigate
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    // Verifica se o usuário está logado (se o token estiver presente no localStorage)
    const isLoggedIn = localStorage.getItem('token') !== null;

    // Função para deslogar (limpar o token do localStorage)
    const handleLogout = () => {
        localStorage.removeItem('token');
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

                    {/* Se o usuário estiver logado, exibe "Meu perfil", senão exibe "Login" */}
                    {isLoggedIn ? (
                        <>
                            <li className="navbar-item">
                                <NavLink to="/profile" className="navbar-link">Meu perfil</NavLink>
                            </li>
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
