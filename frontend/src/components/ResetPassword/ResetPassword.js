import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/reset-password/${uid}/${token}/`, { password });
            setMessage('Senha redefinida com sucesso.');
            setError('');
        } catch (err) {
            setError('Erro ao redefinir a senha.');
            setMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Redefinir Senha</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="password">Nova Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                    <button type="submit">Redefinir Senha</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
