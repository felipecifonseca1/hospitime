import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/forgot-password/', { email });
            setMessage(response.data.detail);
            setError('');
        } catch (err) {
            setError('Erro ao enviar o e-mail.');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Esqueceu a Senha</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                    <button type="submit">Enviar Link de Redefinição</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
