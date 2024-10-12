import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import IniciarSesion from './pages/IniciarSesion';
import BandasUDP from './pages/BandasUDP';
import SalaDeEnsayo from './pages/SalaDeEnsayo';
import Calendario from './pages/Calendario';
import Verificador from './pages/Verificador';
import RegistroUsuario from './components/RegistroUsuario';
import PerfilUsuario from './pages/PerfilUsuario';
import GestionBandas from './pages/GestionBandas';

// import QuienesSomos from './pages/QuienesSomos';
// import VidaUniversitaria from './pages/VidaUniversitaria';
// import BienestarEstudiantil from './pages/BienestarEstudiantil';
// import SaludMental from './pages/SaludMental';
// import Programas from './pages/Programas';
// import Noticias from './pages/Noticias';
// import Contactanos from './pages/Contactanos';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bandas-udp" element={<BandasUDP/>} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/sala-de-ensayo" element={<SalaDeEnsayo />} />
          <Route path="/calendario-salas" element={<Calendario/>} />
          <Route path="/verificador-integrante" element={<Verificador/>} />
          <Route path="/registro-usuario" element={<RegistroUsuario/>} />
          <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
          <Route path="/gestion-bandas" element={<GestionBandas/>} />
          {/* <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
          <Route path="/bienestar-estudiantil" element={<BienestarEstudiantil />} />
          <Route path="/salud-mental" element={<SaludMental />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/contactanos" element={<Contactanos />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;