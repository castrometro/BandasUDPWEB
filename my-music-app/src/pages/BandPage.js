import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BandProfile from '../components/BandProfile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../images/logo.png';

const BandPage = () => {
  const [bandData, setBandData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bandId } = useParams();

  useEffect(() => {
    const fetchBandData = async () => {
      try {
        setIsLoading(true);

        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No estás autenticado. Por favor, inicia sesión.');
        }

        const response = await fetch(`http://localhost:5000/api/bandas/${bandId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los datos de la banda: ${response.statusText}`);
        }

        const data = await response.json();
        setBandData(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos de la banda.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBandData();
  }, [bandId]);

  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header navItems={headerNavItems} logo={logo} />
        <main className="flex-grow bg-gray-100 flex items-center justify-center">
          <p>Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header navItems={headerNavItems} logo={logo} />
        <main className="flex-grow bg-gray-100 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow bg-gray-100">
        {bandData && <BandProfile band={bandData} />}
        {/* <BandProfile band={bandData} /> */}
      </main>
      <Footer />
    </div>
  );
};

export default BandPage;
