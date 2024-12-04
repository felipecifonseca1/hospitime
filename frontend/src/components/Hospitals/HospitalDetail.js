import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HospitalDetail = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/hosp/api/hospitals/${id}`);
                setHospital(response.data);
            } catch (error) {
                console.log('Erro ao carregar os detalhes do hospital', error);
            }
        };

        fetchHospitalDetails();
    }, [id]);

    if (!hospital) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="hospital-detail">
            <h1>{hospital.name}</h1>
            <p><strong>Especialidade:</strong> {hospital.specialty}</p>
            <p><strong>Localização:</strong> {hospital.location}</p>
            <p><strong>Tempo médio de espera:</strong> {hospital.average_wait_time} minutos</p>
            <p><strong>Endereço:</strong> {hospital.address}</p>
        </div>
    );
};

export default HospitalDetail;
