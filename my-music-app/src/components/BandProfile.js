import React from 'react';
import { Instagram, Mail, Music, Youtube } from 'lucide-react';

const BandProfile = ({ band }) => {
  console.log('soy una banda', band);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Foto de la banda */}
          {/* <div className="md:w-1/3">
            <img 
              className="w-full h-full object-cover" 
              src={band.foto || "/placeholder.svg?height=300&width=300"} 
              alt={`Foto de ${band.nombre}`} 
            />
          </div> */}
          
          {/* Información principal */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{band.nombre}</h1>
            
            <div className="md:flex">
              {/* Descripción */}
              <div className="md:w-2/3 pr-4 mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Descripción</h2>
                <p className="text-gray-600">{band.descripcion}</p>
              </div>
              
              {/* Integrantes */}
              <div className="md:w-1/3">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Integrantes</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {band?.integrantes?.map((integrante, index) => (
                    <li key={index}>{integrante}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Evento Próximo */}
        {/* <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Evento Próximo</h2>
          <p className="text-gray-600">{band.proximoEvento.nombre}</p>
          <p className="text-gray-600">{band.proximoEvento.lugar}</p>
          <p className="text-gray-600">{band.proximoEvento.hora}</p>
          <a href={band.proximoEvento.enlace} className="text-indigo-500 hover:text-indigo-600" target="_blank" rel="noopener noreferrer">Enlace</a>
        </div> */}
        
        {/* Contacto */}
        {/* <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contacto</h2>
          <div className="flex space-x-4">
            <a href={band.contacto.instagram} className="text-pink-600 hover:text-pink-700" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
            <a href={`mailto:${band.contacto.correo}`} className="text-gray-600 hover:text-gray-700">
              <Mail size={24} />
            </a>
            <a href={band.contacto.spotify} className="text-green-600 hover:text-green-700" target="_blank" rel="noopener noreferrer">
              <Music size={24} />
            </a>
            <a href={band.contacto.youtube} className="text-red-600 hover:text-red-700" target="_blank" rel="noopener noreferrer">
              <Youtube size={24} />
            </a>
          </div>
        </div> */}
        
        {/* Próximas Reservas */}
        {/* <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Próximas Reservas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {band.proximasReservas.map((reserva, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <p className="font-semibold text-gray-700">{reserva.fecha}</p>
                <p className="text-gray-600">{reserva.hora}</p>
                <p className="text-gray-600">Duración: {reserva.duracion}</p>
                <p className="text-gray-600">Sala: {reserva.sala}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BandProfile;