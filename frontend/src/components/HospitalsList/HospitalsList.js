import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HospitalsList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('http://localhost:3000/hosp/api/hospitais/');
                setHospitals(response.data);
            } catch (error) {
                setError('Não foi possível carregar os hospitais.');
            }
        };

        fetchHospitals();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>Hospitais</h1>
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                        <Link to={`/hospitals/${hospital.id}`}>{hospital.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalsList;
