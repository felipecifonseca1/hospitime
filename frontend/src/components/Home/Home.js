import React from 'react';
import './Home.css'; 
import logo from '../../assets/images/logo.png'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Hospitime</h1>
        <img src={logo} alt="Hospitime Logo" className="home-logo" />
      </div>
    </div>
  );
};

export default Home;