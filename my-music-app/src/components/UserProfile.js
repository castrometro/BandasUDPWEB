import React from 'react';

const UserProfile = ({ usuario }) => {
  return (
    <div className="p-6 sm:p-8 flex flex-col sm:flex-row">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src="/placeholder.svg?height=128&width=128"
          alt="Foto de perfil"
        />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-900">{usuario.nombre} {usuario.apellido}</h1>
        <p className="text-sm text-gray-600 mt-1">{usuario.carrera}</p>
        <p className="text-sm text-gray-600 mt-1">{usuario.correo}</p>
        <p className="text-sm text-gray-700 mt-2">{usuario.descripcion}</p>
        <div className="mt-3">
          <h2 className="text-sm font-semibold text-gray-700">Instrumentos:</h2>
          <p className="text-sm text-gray-600">{usuario.instrumentos.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;