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
    const [userType, setUserType] = useState('patient'); // Tipo de usuário: paciente ou hospital
    const [hospitalName, setHospitalName] = useState(''); // Nome do hospital (hospital)
    const [healthPlan, setHealthPlan] = useState(''); // Plano de saúde (paciente)
    const [address, setAddress] = useState(''); // Endereço (hospital)
    const [specialties, setSpecialties] = useState(''); // Especialidades (hospital)
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        // Verificação de campos obrigatórios com base no tipo de usuário
        if (userType === 'patient' && !healthPlan) {
            setError('O plano de saúde é obrigatório para pacientes.');
            return;
        }

        if (userType === 'hospital' && (!hospitalName || !address || !specialties)) {
            setError('Nome do hospital, endereço e especialidades são obrigatórios para hospitais.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName,
                user_type: userType,
                hospital_name: userType === 'hospital' ? hospitalName : undefined,
                address: userType === 'hospital' ? address : undefined,
                specialties: userType === 'hospital' ? specialties : undefined,
                health_plan: userType === 'patient' ? healthPlan : undefined
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
                    {/* Seletor de Tipo de Usuário */}
                    <div className="input-group">
                        <label>Tipo de Usuário:</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                        >
                            <option value="patient">Paciente</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>

                    {/* Campos comuns para Paciente e Hospital */}
                    {(userType === 'patient' || userType === 'hospital') && (
                        <div>
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
                        </div>
                    )}

                    {/* Campos específicos para Paciente */}
                    {userType === 'patient' && (
                        <>
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
                                <label>Plano de Saúde:</label>
                                <input
                                    type="text"
                                    value={healthPlan}
                                    onChange={(e) => setHealthPlan(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Campos específicos para Hospital */}
                    {userType === 'hospital' && (
                        <>
                            <div className="input-group">
                                <label>Nome do Hospital:</label>
                                <input
                                    type="text"
                                    value={hospitalName}
                                    onChange={(e) => setHospitalName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Endereço:</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Especialidades:</label>
                                <input
                                    type="text"
                                    value={specialties}
                                    onChange={(e) => setSpecialties(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {error && <p className="error">{error}</p>}
                    <div className="link_botao">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;





