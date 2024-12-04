import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HospitalPage = () => {
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/hosp/api/hospitals/hospital/`)  // Ajuste a URL para acessar o hospital pelo ID
            .then(response => response.json())
            .then(data => {
                setHospital(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar hospital:', error);
                setError('Não foi possível carregar os dados do hospital');
                setLoading(false);
            });
    }, [hospital.id]); // Recarrega a página quando o ID mudar

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!hospital) {
        return <p>Hospital não encontrado</p>;
    }

    return (
        <div className="hospital-page">
            <h1>{hospital.name}</h1>
            <p><strong>Especialidade:</strong> {hospital.specialty}</p>
            <p><strong>Localização:</strong> {hospital.location}</p>
            <p><strong>Tempo médio de espera:</strong> {hospital.average_wait_time} minutos</p>
        </div>
    );
};

export default HospitalPage;
