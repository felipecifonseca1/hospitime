import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName
            });

            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setMessage('');
            setError(error.response?.data?.detail || 'Erro ao cadastrar.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Cadastro de Usuário</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Nome de Usuário:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Sobrenome:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirmar Senha:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div class="link_botao">
                        <button type="submit">
                            <a href="/login">Cadastrar</a>
                        </button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;





