import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BandProfile from '../components/BandProfile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../images/logo.png';
import fotobanda from '../images/ecos-del-campus.jpg'

const BandPage = () => {
  const [bandData, setBandData] = useState(null);
  const { bandId } = useParams();

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los datos de la banda
    // Por ahora, usaremos datos de ejemplo
    const mockBandData = {
      id: bandId,
      nombre: "Los Rockeros UDP",
      foto: fotobanda,
      descripcion: "Banda de rock alternativo formada por estudiantes de la UDP. Conocidos por sus energéticas presentaciones en vivo y sus letras reflexivas sobre la vida universitaria.",
      integrantes: ["Juan Pérez (Vocalista)", "María González (Guitarra)", "Pedro Soto (Bajo)", "Ana Muñoz (Batería)"],
      proximoEvento: {
        nombre: "Concierto de Primavera UDP",
        lugar: "Auditorio Central UDP",
        hora: "20:00 hrs",
        enlace: "https://ejemplo.com/evento-primavera-udp"
      },
      contacto: {
        instagram: "https://instagram.com/losrockerosudp",
        correo: "contacto@losrockerosudp.com",
        spotify: "https://open.spotify.com/artist/losrockerosudp",
        youtube: "https://youtube.com/losrockerosudp"
      },
      proximasReservas: [
        { fecha: "15 Oct 2023", hora: "18:00-20:00", duracion: "2 horas", sala: "Sala A" },
        { fecha: "22 Oct 2023", hora: "19:00-21:00", duracion: "2 horas", sala: "Sala B" },
        { fecha: "29 Oct 2023", hora: "17:00-19:00", duracion: "2 horas", sala: "Sala C" }
      ]
    };

    setBandData(mockBandData);
  }, [bandId]);

  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

  if (!bandData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow bg-gray-100">
        <BandProfile band={bandData} />
      </main>
      <Footer />
    </div>
  );
};

export default BandPage;