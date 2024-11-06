import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';
import Home from './pages/Home';
import IniciarSesion from './pages/IniciarSesion';
import BandasUDP from './pages/BandasUDP';
import SalaDeEnsayo from './pages/SalaDeEnsayo';
import Calendario from './pages/Calendario';
import Verificador from './pages/Verificador';
import RegistroUsuario from './components/RegistroUsuario';
import PerfilUsuario from './pages/PerfilUsuario';
import BandPage from './pages/BandPage';
import Reservar from './pages/reservar';
import GestionBandas from './pages/GestionBandas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bandas-udp" element={<BandasUDP/>} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/sala-de-ensayo" element={<SalaDeEnsayo />} />
            <Route path="/calendario-salas" element={<Calendario/>} />
            <Route path="/verificador-integrante" element={<Verificador/>} />
            <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
            <Route path="/band-page" element={<BandPage/>} />
            <Route path="/reservar" element={<Reservar/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;