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
import axios from 'axios';

const HospitalDetails = ({ hospitalId }) => {
    const [hospital, setHospital] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [rede, setRede] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hospitais/${hospitalId}`);
                setHospital(response.data);
                setRede(response.data.rede);  // Atribuindo o atributo "Rede"
                fetchComentarios(response.data.id);
            } catch (err) {
                setError('Erro ao carregar os dados do hospital');
            }
        };

        const fetchComentarios = async (hospitalId) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hospitais/${hospitalId}/comentarios/`);
                setComentarios(response.data);
            } catch (err) {
                setError('Erro ao carregar os comentários');
            }
        };

        fetchHospitalDetails();
    }, [hospitalId]);

    const handleComentarioChange = (e) => {
        setNovoComentario(e.target.value);
    };

    const handleComentarioSubmit = async () => {
        if (novoComentario.trim() === '') {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:8000/api/hospitais/${hospitalId}/comentarios/`,
                { comentario: novoComentario },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComentarios([...comentarios, response.data]);
            setNovoComentario('');
        } catch (err) {
            setError('Erro ao postar comentário');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {hospital ? (
                <>
                    <h2>{hospital.nome}</h2>
                    <p>{hospital.endereco}</p>
                    <p><strong>Rede:</strong> {rede}</p>

                    <h3>Comentários</h3>
                    <div>
                        {comentarios.map((comentario) => (
                            <div key={comentario.id}>
                                <p>{comentario.usuario.username}</p>
                                <p>{comentario.comentario}</p>
                                <p>{new Date(comentario.data_criacao).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <textarea
                        value={novoComentario}
                        onChange={handleComentarioChange}
                        placeholder="Deixe seu comentário"
                    />
                    <button onClick={handleComentarioSubmit}>Postar Comentário</button>
                </>
            ) : (
                <p>Carregando dados do hospital...</p>
            )}
        </div>
    );
};

export default HospitalDetails;
