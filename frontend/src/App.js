import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // React Router v6
import Navbar from './components/Navbar/Navbar';  // Componente Navbar
import Login from './components/Login/Login';    // Página de login
import HospitalsList from './components/HospitalsList/HospitalsList'; // Página dos hospitais
import Home from './components/Home/Home';    // Página inicial (Home)
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import HospitalDetail from './components/Hospitals/HospitalDetail';
import HospitalPage from './components/HospitalPage/HospitalPage';
import Hospitals from './components/Hospitals/Hospitals';


function App() {
  return (
    <Router>
      <Navbar />  {/* Barra de navegação fixada no topo */}

      <div className="app-content">
        <Routes>
          {/* Definição das rotas */}
          <Route path="/" element={<Home />} />  {/* Página inicial */}
          <Route path="/login" element={<Login />} />  {/* Página de login */}
          <Route path="/hospitais" element={<HospitalsList />} />  {/* Página dos hospitais */}
          <Route path="/h" element={<HospitalDetail />} />  {/* Nova rota para o detalhamento */}
          <Route path="/hospital" element={<HospitalPage />} />
          <Route path="/hosp" element={<Hospitals />} />
          <Route path="/home" element={<Home />} />  {/* Página home */}
          <Route path="/register" element={<Register />} />  {/* Página de registro */}
          <Route path="/profile" element={<Profile />} />  {/* Página de perfil */}
          <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Página de recuperação de senha */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
