import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

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
    const [patientAddress, setPatientAddress] = useState(''); // Endereço do paciente
    const [hospitalAddress, setHospitalAddress] = useState(''); // Endereço do hospital
    const [specialties, setSpecialties] = useState(''); // Especialidades (hospital)
    const [birthDate, setBirthDate] = useState(''); // Data de nascimento (paciente)
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [network, setNetwork] = useState(''); // Rede do hospital
    const [convenios, setConvenios] = useState(''); // Convênios (hospital)
    const navigate = useNavigate();

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

        if (userType === 'hospital' && (!hospitalName || !hospitalAddress || !specialties)) {
            setError('Nome do hospital, endereço e especialidades são obrigatórios para hospitais.');
            return;
        }

        try {
            let response
            if (userType === 'patient') {
                 // Enviando dados para o backend
                response = await axios.post('http://localhost:8000/acc/register/', {
                    // Campos para o paciente
                    username,
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    address: patientAddress,
                    health_plan: healthPlan,
                    birth_date: birthDate,
                })
            } else {
                response = await axios.post('http://localhost:8000/hosp/register/', {
                    // Campos para o hospital
                    username: hospitalName,
                    password,
                    email,
                    specialties,
                    network,
                    address: hospitalAddress,
                    convenios,
                }) 
            }

            // Armazenar tipo de usuário no localStorage após o sucesso
            localStorage.setItem('userType', userType);

            // Redireciona o usuário para a página de login
            navigate('/login');

            // Exibe a mensagem de sucesso
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            // Verifica o tipo de erro e exibe a mensagem correta
            setMessage('');
            if (error.response) {
                // Se o erro for de resposta do servidor
                setError(error.response.data.detail || 'Erro ao cadastrar. Tente novamente.');
            } else if (error.request) {
                // Se não houver resposta (erro de rede, timeout, etc)
                setError('Erro de rede. Verifique sua conexão.');
            } else {
                // Outros erros gerais
                setError('Ocorreu um erro inesperado. Tente novamente.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Cadastro de Usuário</h2>
    
                {/* Centralizar a seleção do tipo de usuário */}
                <div className="type-selector">
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
    
                {/* Formulário em duas colunas */}
                <form className="form-grid" onSubmit={handleRegister}>
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
                            <div className="input-group">
                                <label>Primeiro Nome:</label>
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
                            <div className="input-group">
                                <label>Endereço:</label>
                                <input
                                    type="text"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Data de Nascimento:</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
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
                            <div className="input-group">
                                <label>Endereço:</label>
                                <input
                                    type="text"
                                    value={hospitalAddress}
                                    onChange={(e) => setHospitalAddress(e.target.value)}
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
                                <label>Especialidades:</label>
                                <input
                                    type="text"
                                    value={specialties}
                                    onChange={(e) => setSpecialties(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Rede de Saúde:</label>
                                <input
                                    type="text"
                                    value={network}
                                    onChange={(e) => setNetwork(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Convênios Atendidos:</label>
                                <input
                                    type="text"
                                    value={convenios}
                                    onChange={(e) => setConvenios(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
    
                    {/* Botão de enviar */}
                    <div className="link_botao">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
    
                {/* Mensagens de erro e sucesso */}
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
            </div>
        </div>
    );
    
};

export default Register;
