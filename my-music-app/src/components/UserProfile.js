import React from 'react';
import Fperfil from '../images/Fondo_login.png'

const UserProfile = ({ usuario }) => {

  // Manejo de propiedades con valores predeterminados
  const nombre = usuario.nombre || 'Nombre no disponible';
  const apellido = usuario.apellido || '';
  const carrera = usuario.carrera || 'Carrera no disponible';
  const correo = usuario.correo || 'Correo no disponible';

  // Manejo de instrumentos
  const instrumentos = Array.isArray(usuario.instrumentos)
    ? usuario.instrumentos.join(', ')
    : 'No hay instrumentos disponibles';

  return (
    <div className="p-6 sm:p-8 flex flex-col sm:flex-row">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={Fperfil}
          alt="Foto de perfil"
        />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-900">
          {nombre} {apellido}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{carrera}</p>
        <p className="text-sm text-gray-600 mt-1">{correo}</p>
        <div className="mt-3">
          <h2 className="text-sm font-semibold text-gray-700">Instrumentos:</h2>
          <p className="text-sm text-gray-600">{instrumentos}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
