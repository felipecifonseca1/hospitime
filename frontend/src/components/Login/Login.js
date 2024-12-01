import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Vamos adicionar o arquivo de CSS

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            
            // Armazenar o token JWT no localStorage
            localStorage.setItem('token', response.data.token);

            // Redirecionar para o perfil ou home após login
            window.location.href = '/profile';
        } catch (err) {
            setError('Credenciais inválidas.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="link_botao">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
                <div className="links">
                    <a href="/register">Cadastre-se</a> | <a href="/esqueci-senha">Esqueceu a senha?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;