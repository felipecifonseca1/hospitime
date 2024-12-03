import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();  // Obter o ID do hospital da URL
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/hosp/api/hospitals/')
            .then(response => response.json())
            .then(data => {
                setHospitals(data);
                console.log("Hospitais carregados:", data); // Aqui imprime os hospitais com seus IDs
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os hospitais:', error);
                setLoading(false);
            });
    }, []);

    // Função para navegar para o hospital selecionado
    const handleSelectHospital = (hospitalId) => {
        console.log("Hospital ID:", hospitalId); // Verifique o valor do ID
        navigate(`/hospitais/${Number(hospitalId)}`);  // Navega para a página de detalhamento
    };
    // Obter o hospital atual com base no ID da URL
    const currentHospital = hospitals.find(hospital => hospital.id === parseInt(id));

    return (
        <div className="hospitals-container">
            <h1>Hospitais</h1>

            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <div>
                    {/* {currentHospital ? (
                        <div>
                            <h2>{currentHospital.name}</h2>
                            <p><strong>Especialidade:</strong> {currentHospital.specialty}</p>
                            <p><strong>Localização:</strong> {currentHospital.location}</p>
                            <p><strong>Tempo médio de espera:</strong> {currentHospital.average_wait_time} minutos</p>
                        </div>
                    ) : (
                        <p>Hospital não encontrado.</p>
                    )} */}

                    {/* Lista de hospitais para selecionar */}
                    <div>
                        <h3>Escolha um hospital</h3>
                        <ul>
                            {hospitals.map((hospital) => (
                                <li
                                    key={hospital.id}
                                    onClick={() => {
                                        console.log("ID do hospital sendo clicado:", hospital.id); // Verifique o ID ao clicar
                                        handleSelectHospital(hospital.id);
                                    }}
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    {hospital.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Exibir mensagem de erro caso ocorra */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Hospitals;