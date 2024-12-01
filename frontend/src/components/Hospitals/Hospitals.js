import React, { useState, useEffect } from 'react';

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
                                    <p><strong>Especialidade:</strong> {hospital.specialty}</p>
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

export default Hospitals;