import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeeklyCalendar from '../components/WeeklyCalendar';
import logoUDP from '../images/logo.png';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simular datos de eventos
    const calendarEventsData = {
      events: [
        { date: '2024-12-04T09:00:00', title: 'Banda Carlitos', description: 'Ensayo Sala A' },
        { date: '2024-12-05T15:30:00', title: 'Conferencia', description: 'Sala C' },
      ],
    };
    
    setEvents(calendarEventsData.events);
  }, []);

  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/sala-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" },
  ];

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
