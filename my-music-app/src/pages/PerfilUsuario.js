// PerfilUsuario.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import BandCarousel from '../components/BandCarousel';
import ReservationList from '../components/ReservationList';
import logo from '../images/logo.png';
import axios from 'axios';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [bandas, setBandas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No se encontró un token de autenticación. Inicia sesión nuevamente.");
        return;
      }

      try {
        // Obtener datos del usuario
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUsuario(userData);

        // Obtener detalles de la banda del usuario
        if (userData.id_banda) {
          const bandaResponse = await axios.get(`http://localhost:5000/api/bandas/${userData.id_banda}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setBandas([bandaResponse.data]);

          // Obtener próximas reservas de la banda
          const reservasResponse = await axios.get(`http://localhost:5000/api/reservas/proximas/${userData.id_banda}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setReservas(reservasResponse.data);
        }
      } catch (err) {
        console.error(err);
        setError("Error al obtener datos del usuario o reservas.");
      }
    };

    fetchUserData();
  }, []);

  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Calendario salas", url: "/calendario-salas" },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <UserProfile usuario={usuario} />
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Mis Bandas</h2>
              <BandCarousel bandas={bandas} />
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
