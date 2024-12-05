import React, { useState, useEffect } from 'react';
import { formatISO, startOfDay } from 'date-fns'; // Importar funciones útiles
import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Modal from './Modal';
import axios from 'axios';

const WeeklyCalendar = ({ events }) => {
  const [weekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bandas, setBandas] = useState([]); // Bandas del usuario

  useEffect(() => {
    const fetchBands = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/users/my-bands', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBandas(response.data); // Establece las bandas en el estado
      } catch (error) {
        console.error('Error al cargar las bandas:', error);
      }
    };
  
    fetchBands();
  }, []);
  // Días: solo de lunes a viernes
  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  // Horas desde 8:00 hasta 21:00 en intervalos de 1 hora
  const hours = Array.from({ length: 14 }, (_, i) => {
    const baseHour = 8 + i; // Comienza desde las 8 y suma i
    return { hour: baseHour, minutes: 0 }; // Siempre comienza en 0 minutos
  });



  const getEventForDateAndTime = (date, hour, minutes) => {
    return events.find((event) => {
      const eventDate = parseISO(event.date);
      console.log(eventDate)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getHours() === hour &&
        eventDate.getMinutes() === minutes
      );
    });
  };

  const handleCellClick = (day, hour, minutes) => {
    setSelectedSlot({
      day: format(day, 'EEEE', { locale: es }),
      time: `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`,
    });
    setModalOpen(true);
  };

  const usuario = JSON.parse(localStorage.getItem('user')); // Obtener usuario desde localStorage

  const handleConfirmReservation = async (sala, banda) => {
    if (!sala || !banda) {
      alert('Debes seleccionar una sala y una banda antes de confirmar.');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    try {
        // Convertir el día seleccionado a una fecha válida en formato 'YYYY-MM-DD'
      const selectedDate = addDays(startOfDay(new Date()), days.findIndex(day => day === selectedSlot.day));
      const formattedFecha = formatISO(selectedDate, { representation: 'date' });

      // Asegurar que hora_inicio y hora_fin estén correctamente formateados
      const [hour, minute] = selectedSlot.time.split(':').map(Number);
      const horaInicio = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      const horaFin = `${(hour + 1).toString().padStart(2, '0')}:00:00`;

   
      // Log para depuración
      console.log('Datos enviados a la API:', {
        sala_id: sala === 'Toesca' ? 1 : 2,
        fecha: formattedFecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        banda_id: banda,
      });

      const response = await axios.post(
        'http://localhost:5000/api/reservas/create',
        {
          sala_id: sala === 'Toesca' ? 1 : 2,
          fecha: formattedFecha,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          banda_id: banda,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert('Reserva creada exitosamente');
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('No se pudo crear la reserva. Intenta de nuevo.');
    }
    
  };
  

  return (
    <div className="container mx-auto">
      <h2
        className="text-2xl font-bold mb-4 text-center"
        style={{ color: '#dd3333', marginTop: '20px' }}
      >
        Calendario de Salas
      </h2>
      <div className="overflow-x-auto overflow-y-auto max-h-screen">
        <table
          className="table-auto w-full text-sm"
          style={{
            borderCollapse: 'separate',
            borderSpacing: '10px',
          }}
        >
          <thead>
            <tr>
              <th
                className="p-2 text-left w-20 text-black"
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f5f5f5',
                  zIndex: 10,
                }}
              >
                Hora
              </th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className="p-2 text-center text-black"
                  style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#f5f5f5',
                    zIndex: 10,
                    fontWeight: 'bold',
                  }}
                >
                  {format(day, 'EEEE', { locale: es })} <br />
                  {format(day, 'd MMM', { locale: es })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(({ hour, minutes }, index) => (
              <tr key={index} className="text-center">
                {/* Hora */}
                <td
                  className="p-4 bg-gray-50 text-black font-bold"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  {`${hour.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}`}
                </td>
                {/* Celdas para cada día */}
                {days.map((day, dayIndex) => {
                  const event = getEventForDateAndTime(day, hour, minutes);
                  return (
                    <td
                      key={dayIndex}
                      className={`p-4 text-center ${
                        event ? 'text-white' : 'text-black'
                      }`}
                      style={{
                        backgroundColor: event ? '#dd3333' : '#ffffff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                      }}
                      onClick={() =>
                        !event && handleCellClick(day, hour, minutes)
                      }
                    >
                      {event ? (
                        <div>
                          <p className="font-bold">{event.title}</p>
                          <p className="text-xs">{event.description}</p>
                        </div>
                      ) : (
                        <p>Disponible</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(sala, banda) => handleConfirmReservation(sala, banda)}
        selectedSlot={selectedSlot}
        bandas={bandas} // Pasa las bandas como prop
      />

    </div>
  );
};

export default WeeklyCalendar;
