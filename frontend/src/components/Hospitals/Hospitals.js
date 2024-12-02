/*import React, { useState, useEffect } from 'react';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/hosp/api/hospitals/')
            .then(response => response.json())
            .then(data => {
                setHospitals(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os hospitais:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="hospitals-container">
            <h1>Hospitais</h1>

            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <div>
                    {hospitals.length > 0 ? (
                        <ul>
                            {hospitals.map((hospital) => (
                                <li key={hospital.id}>
                                    <h3>{hospital.name}</h3>
                                    <h4>{hospital.rede}</h4>
                                    <p><strong>Especialidades:</strong> {hospital.specialty}</p>
                                    <p><strong>Localização:</strong> {hospital.location}</p>
                                    <p><strong>Tempo médio de espera:</strong> {hospital.average_wait_time} minutos</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum hospital encontrado.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hospitals; */

import React, { useState, useEffect } from 'react';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comentarios, setComentarios] = useState({});
    const [novoComentario, setNovoComentario] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/hosp/api/hospitals/')
            .then(response => response.json())
            .then(data => {
                setHospitals(data);
                setLoading(false);
                data.forEach(hospital => {
                    setComentarios(prevState => ({
                        ...prevState,
                        [hospital.id]: [] // Inicializando os comentários vazios
                    }));
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os hospitais:', error);
                setLoading(false);
            });
    }, []);

    const handleComentarioChange = (hospitalId, e) => {
        setNovoComentario(prevState => ({
            ...prevState,
            [hospitalId]: e.target.value
        }));
    };

    const handleComentarioSubmit = (hospitalId) => {
        const comentario = novoComentario[hospitalId];

        if (comentario.trim() === '') {
            setError('Por favor, escreva um comentário.');
            return;
        }

        // Adicionando o comentário na lista de comentários
        setComentarios(prevState => ({
            ...prevState,
            [hospitalId]: [
                ...prevState[hospitalId],
                {
                    id: Date.now(), // Usando o timestamp como ID temporário
                    comentario,
                    usuario: 'Usuário', // Você pode substituir por um nome de usuário real
                    data_criacao: new Date().toLocaleString()
                }
            ]
        }));

        // Limpar o campo de comentário
        setNovoComentario(prevState => ({
            ...prevState,
            [hospitalId]: ''
        }));

        setError('');
    };

    return (
        <div className="hospitals-container">
            <h1>Hospitais</h1>

            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <div>
                    {hospitals.length > 0 ? (
                        <ul>
                            {hospitals.map((hospital) => (
                                <li key={hospital.id}>
                                    <h3>{hospital.name}</h3>
                                    <h4>{hospital.rede}</h4>
                                    <p><strong>Especialidades:</strong> {hospital.specialty}</p>
                                    <p><strong>Localização:</strong> {hospital.location}</p>
                                    <p><strong>Tempo médio de espera:</strong> {hospital.average_wait_time} minutos</p>
                                    
                                    {/* Seção de Comentários */}
                                    <div className="comentarios-section">
                                        <h4>Comentários</h4>
                                        <div className="comentarios-list">
                                            {comentarios[hospital.id] && comentarios[hospital.id].length > 0 ? (
                                                comentarios[hospital.id].map((comentario) => (
                                                    <div key={comentario.id} className="comentario">
                                                        <p><strong>{comentario.usuario}</strong> - {comentario.data_criacao}</p>
                                                        <p>{comentario.comentario}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Sem comentários ainda.</p>
                                            )}
                                        </div>
                                        
                                        <textarea
                                            value={novoComentario[hospital.id] || ''}
                                            onChange={(e) => handleComentarioChange(hospital.id, e)}
                                            placeholder="Deixe seu comentário"
                                        />
                                        <button onClick={() => handleComentarioSubmit(hospital.id)}>Postar Comentário</button>
                                        {error && <p className="error">{error}</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum hospital encontrado.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hospitals;
