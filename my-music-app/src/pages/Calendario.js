import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeeklyCalendar from '../components/WeeklyCalendar';
import calendarEventsData from '../data/calendarEvents.json';
import logoUDP from '../images/logo.png';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // En una aplicación real, aquí podrías hacer una llamada a una API
    // para obtener los eventos del calendario
    setEvents(calendarEventsData.events);
  }, []);

  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logoUDP} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <WeeklyCalendar events={events} />
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;