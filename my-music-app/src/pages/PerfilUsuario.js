import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BandCarousel from '../components/BandCarousel';
import ReservationList from '../components/ReservationList';
import CrearBanda from '../components/CrearBanda';
import UnirseBanda from '../components/UnirseBanda';
import logo from '../images/logo.png';
import Fperfil from '../images/Fondo_login.png'; // Foto del usuario
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [bandas, setBandas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const userData = response.data;
          setUsuario(userData);

          if (userData.id_banda) {
            const bandaResponse = await axios.get(
              `http://localhost:5000/api/bandas/${userData.id_banda}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setBandas([bandaResponse.data]);

            const reservasResponse = await axios.get(
              `http://localhost:5000/api/reservas/proximas/${userData.id_banda}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setReservas(reservasResponse.data);
          }

          // Obtener instrumentos del usuario
          const instrumentosResponse = await axios.get(
            `http://localhost:5000/api/users/instruments/${userData.id_usuario}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setInstrumentos(instrumentosResponse.data);
        } catch (err) {
          console.error('Error al obtener datos del usuario:', err);
          setError('Error al obtener datos del usuario o reservas.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleBandaCreada = (nuevaBanda) => {
    setBandas([...bandas, nuevaBanda]);
  };

  const handleBandaUnida = (nuevaBanda) => {
    setBandas([...bandas, nuevaBanda]);
  };

  const headerNavItems = [
    { title: 'Inicio', url: '/' },
    { title: 'Salas de ensayo', url: '/salas-de-ensayo' },
    { title: 'Bandas UDP', url: '/bandas-udp' },
    { title: 'Calendario salas', url: '/calendario-salas' },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ backgroundColor: '#f5f5f5', color: '#000000' }}
          >
            {/* Foto e información del usuario */}
            <div className="px-6 py-4 bg-gray-50 flex flex-col items-center md:flex-row md:items-start">
              {/* Foto del usuario */}
              <img
                src={Fperfil}
                alt="Foto del usuario"
                className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
              />

              {/* Información del usuario */}
              <div className="text-center md:text-left">
                <h2 className="text-lg font-semibold mb-2" style={{ color: '#dd3333' }}>
                  Información del Usuario
                </h2>
                <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
                <p><strong>Carrera:</strong> {usuario.carrera}</p>
                <p><strong>Email:</strong> {usuario.correo}</p>
                <p><strong>Instrumentos:</strong></p>
                <ul className="list-disc list-inside">
                  {instrumentos.length > 0 ? (
                    instrumentos.map((instrumento) => (
                      <li key={instrumento.id_instrumento}>{instrumento.nombre}</li>
                    ))
                  ) : (
                    <li>No hay instrumentos registrados</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Botón para editar perfil */}
            <div className="px-6 py-4 text-center md:text-right">
              <button
                onClick={() => navigate('/editar-perfil')}
                className="px-4 py-2 rounded-md w-full md:w-auto"
                style={{
                  backgroundColor: '#dd3333', // Fondo rojo
                  color: '#ffffff', // Texto blanco
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#000000')} // Negro al pasar el mouse
                onMouseOut={(e) => (e.target.style.backgroundColor = '#dd3333')} // Rojo al quitar el mouse
              >
                Editar Perfil
              </button>
            </div>

            {/* Bandas y Reservas */}
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Mis Bandas</h2>
              <BandCarousel bandas={bandas} />
              <CrearBanda onBandaCreada={handleBandaCreada} />
              <UnirseBanda onBandaUnida={handleBandaUnida} />
            </div>
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Próximas Reservas</h2>
              <ReservationList reservas={reservas} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;
