import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import BandCarousel from '../components/BandCarousel';
import ReservationList from '../components/ReservationList';
import logo from '../images/logo.png';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos del usuario
    const usuarioEjemplo = {
      nombre: 'Juan',
      apellido: 'Pérez',
      carrera: 'Ingeniería en Sonido',
      correo: 'juan.perez@example.com',
      descripcion: 'Músico apasionado con experiencia en bandas de rock y jazz.',
      instrumentos: ['Guitarra', 'Voz', 'Teclado'],
      bandas: ['Banda 1', 'Banda 2', 'Banda 3', 'Banda 4', 'Banda 5'],
      reservas: [
        { banda: 'Banda 1', fecha: '2023-10-15', hora: '18:00', duracion: '2 horas', sala: 'Sala A' },
        { banda: 'Banda 2', fecha: '2023-10-17', hora: '20:00', duracion: '1.5 horas', sala: 'Sala B' },
        { banda: 'Banda 3', fecha: '2023-10-20', hora: '19:00', duracion: '2 horas', sala: 'Sala C' },
      ]
    };
    setUsuario(usuarioEjemplo);
  }, []);

  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

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
              <BandCarousel bandas={usuario.bandas} />
            </div>

            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Próximas Reservas</h2>
              <ReservationList reservas={usuario.reservas} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;