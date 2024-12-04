import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Adicionar Link para navegação entre páginas

const Home = () => {
    const [search, setSearch] = useState('');
    const [bairro, setBairro] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Controla a exibição do filtro

    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen)
    };

    const handleUsernameChange = (e) => {
        setSearch(e.target.value);
    };

    const handleBairroChange = (e) => {
        setBairro(e.target.value);
    };

    const handleEspecialidadeChange = (e) => {
        setEspecialidade(e.target.value);
    };

    // Função para realizar a pesquisa com debouncing
    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/hosp/?username=${search}&bairro=${bairro}&specialty=${especialidade}`);
                console.log(response)
                setHospitals(response.data);
            } catch (error) {
                console.log('Não foi possível carregar os hospitais.');
            }
        };

        handleSearch()
    }, [search, bairro, especialidade]); // Re-executa quando os valores de pesquisa ou filtros mudarem

    return (
        <div className="home-container">
            {/* Barra de Pesquisa */}
            <div className="search-bar">
                <form className="search-form">
                    <input
                        type="text"
                        value={search}
                        onChange={event => handleUsernameChange(event)}
                        className="search-input"
                        placeholder="Pesquise por hospitais"
                    />

                    {/* Botão de Buscar */}
                    <button type="button" className="search-button">
                        Buscar
                    </button>

                    {/* Botão de Filtro */}
                    <button type="button" onClick={toggleFilterMenu} className="filter-button">
                        Filtrar
                    </button>

                    {/* Dropdown de Filtros */}
                    {isFilterOpen && (
                        <div className="filter-dropdown">
                            {/* Filtro de Bairro */}
                            <input
                                type="text"
                                value={bairro}
                                onChange={event => handleBairroChange(event)}
                                className="search-input"
                                placeholder="Pesquise por bairro"
                            />

                            {/* Filtro de Especialidade */}
                            <select value={especialidade} onChange={event => handleEspecialidadeChange(event)} className="especialidade-select">
                                <option value="">Especialidade</option>
                                <option value="cardiologia">Cardiologia</option>
                                <option value="ortopedia">Ortopedia</option>
                                <option value="pediatria">Pediatria</option>
                                <option value="neurologia">Neurologia</option>
                            </select>
                        </div>
                    )}
                </form>
            </div>

            {/* Conteúdo Principal - Título */}
            <div className="home-content">
                <h1 className="home-title">Hospitime</h1>
            </div>

            {/* Exibição dos Hospitais Encontrados */}
            <div className="hospital-list">
                {hospitals.length > 0 ? (
                    hospitals.map((hospital, index) => (
                        <div key={index} className="hospital-card">
                            <h3>{hospital.username}</h3>
                            <h3>{hospital.user.username}</h3>
                            <p>{hospital.address}</p>

                            {/* Link para Detalhes do Hospital */}
                            <Link to={`/hospitals/${hospital.id}`} className="view-details">
                                Ver Detalhes
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Nenhum hospital encontrado.</p>
                )}
            </div>

            {/* Logo */}
            <div className="home-logo-container">
                <img src={logo} alt="Hospitime Logo" className="home-logo" />
            </div>
        </div>
    );
};

export default Home;
