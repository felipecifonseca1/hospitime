import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // React Router
import Navbar from './components/Navbar/Navbar';  // Componente Navbar
import Login from './components/Login/Login';    // Página de login
import Hospitals from './components/Hospitals/Hospitals'; // Página dos hospitais
import Home from './components/Home/Home';    // Página inicial (Home)
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <Router>
      <Navbar />  {/* Barra de navegação fixada no topo */}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />  
          <Route path="/hospitais" element={<Hospitals />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;