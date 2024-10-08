import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const StudentProfile = ({ profile }) => {
  return (
    <div className="mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
      <p><strong>Banda:</strong> {profile.band}</p>
      <p><strong>Fecha:</strong> {format(new Date(), 'EEEE d \'de\' MMMM, yyyy', { locale: es })}</p>
      <p>
        <strong>Estado de ensayo:</strong> 
        {profile.hasRehearsalToday 
          ? `Tiene ensayo hoy de ${profile.rehearsalTime}`
          : "No tiene ensayo programado para hoy"}
      </p>
    </div>
  );
};

export default StudentProfile;