import React from 'react';
import { NavLink } from 'react-router-dom';  // Usando NavLink
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">Hospitime</NavLink>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink to="/" className="navbar-link">Home</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/login" className="navbar-link">Login</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/hospitais" className="navbar-link">Hospitais</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;