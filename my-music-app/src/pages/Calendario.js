import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeeklyCalendar from '../components/WeeklyCalendar';
import logoUDP from '../images/logo.png';
import axios from 'axios';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejo de carga
  const [error, setError] = useState(null); // Estado para manejo de errores

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/reservas/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transformar los datos de la respuesta para que sean compatibles con WeeklyCalendar
        const transformedEvents = response.data
          .filter(
            (reserva) =>
              reserva.fecha &&
              reserva.hora_inicio &&
              reserva.banda_nombre &&
              reserva.sala_nombre
          ) // Filtra eventos incompletos
          .map((reserva) => ({
            date: `${reserva.fecha.slice(0, 10)}T${reserva.hora_inicio}`,// Combina fecha y hora
            title: reserva.banda_nombre, // Nombre de la banda
            description: reserva.sala_nombre, // Nombre de la sala
          }));
        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error al obtener las reservas:', err);
        setError('No se pudieron cargar las reservas. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchReservations(); // Llama a la función para obtener los datos
  }, []);

  const headerNavItems = [
    { title: 'Login', url: '/iniciar-sesion' },
    { title: 'Salas de ensayo', url: '/sala-de-ensayo' },
    { title: 'Bandas UDP', url: '/bandas-udp' },
    { title: 'Verificador Integrante', url: '/verificador-integrante' },
    { title: 'Calendario salas', url: '/calendario-salas' },
  ];

  // Renderiza un mensaje de carga si los datos aún no están listos
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header navItems={headerNavItems} logo={logoUDP} />
        <main className="flex-grow container mx-auto text-center text-blue-500">
          Cargando...
        </main>
        <Footer />
      </div>
    );
  }

  // Renderiza un mensaje de error si hubo un problema
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header navItems={headerNavItems} logo={logoUDP} />
        <main className="flex-grow container mx-auto text-center text-red-500">
          {error}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logoUDP} />
      <main className="flex-grow container mx-auto">
        <WeeklyCalendar events={events} />
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;
