// ReservationList.js
import React from 'react';

const ReservationList = ({ reservas }) => {
  if (reservas.length === 0) {
    return <p>No hay próximas reservas.</p>;
  }

  return (
    <ul>
      {reservas.map((reserva) => (
        <li key={reserva.id} className="mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p><strong>Fecha:</strong> {reserva.fecha}</p>
            <p><strong>Hora de Inicio:</strong> {reserva.hora_inicio}</p>
            <p><strong>Hora de Fin:</strong> {reserva.hora_fin}</p>
            <p><strong>Sala:</strong> {reserva.sala_id}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReservationList;
