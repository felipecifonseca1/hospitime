import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HospitalDetail = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [tempoEspera, setTempoEspera] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/hosp/api/hospitals/${id}/`)
            .then(response => response.json())
            .then(data => {
                setHospital(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar o hospital:', error);
                setError('Erro ao carregar os dados');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:8000/hosp/api/hospitals/${id}/adicionar-tempo-espera/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adicione o token de autenticação
            },
            body: JSON.stringify({ tempo_espera: tempoEspera })
        })
        .then(response => response.json())
        .then(data => {
            setHospital(data);  // Atualiza a página com o hospital atualizado
            setTempoEspera('');  // Limpa o campo de tempo de espera
        })
        .catch(error => {
            console.error('Erro ao adicionar o tempo de espera:', error);
            setError('Erro ao adicionar o tempo de espera');
        });
    };

    return (
        <div>
            <h1>{hospital?.name}</h1>
            <p><strong>Especialidade:</strong> {hospital?.specialty}</p>
            <p><strong>Localização:</strong> {hospital?.location}</p>
            <p><strong>Tempo médio de espera:</strong> {hospital?.average_wait_time} minutos</p>

            <h2>Adicionar Tempo de Espera</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tempo de Espera (minutos):
                    <input
                        type="number"
                        value={tempoEspera}
                        onChange={(e) => setTempoEspera(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Adicionar</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default HospitalDetail;