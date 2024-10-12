import React from 'react';

const ReservationList = ({ reservas }) => {
  return (
    <div className="space-y-3">
      {reservas.map((reserva, index) => (
        <div key={index} className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-900">{reserva.banda}</h3>
          <p className="text-sm text-gray-600">
            {reserva.fecha} - {reserva.hora} ({reserva.duracion})
          </p>
          <p className="text-sm text-gray-600">{reserva.sala}</p>
        </div>
      ))}
    </div>
  );
};

export default ReservationList;