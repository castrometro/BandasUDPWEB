import React, { useState } from 'react';
import { format, startOfWeek, addDays, parseISO, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

const WeeklyCalendar = ({ events }) => {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8:00 to 21:00

  const getEventForDateAndTime = (date, hour) => {
    return events.find(event => {
      const eventDate = parseISO(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getHours() === hour;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Calendario Salas</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {days.map((day, index) => (
                <th key={index} className="border p-2">
                  {format(day, 'EEEE', { locale: es })}
                  <br />
                  {format(day, 'd MMM', { locale: es })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border p-2 font-semibold">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </td>
                {days.map((day, dayIndex) => {
                  const event = getEventForDateAndTime(day, hour);
                  return (
                    <td key={dayIndex} className="border p-2">
                      {event && (
                        <div className="bg-blue-100 p-1 rounded">
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyCalendar;