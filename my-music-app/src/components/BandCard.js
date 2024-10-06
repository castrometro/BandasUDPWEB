import React from 'react'
import { Link } from 'react-router-dom'

const BandCard = ({ id, name, genre, image, nextPerformance }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">Género: {genre}</p>
      <p className="text-sm text-gray-500 mb-4">Próxima presentación: {nextPerformance}</p>
      <Link to={`/bandas/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Ver perfil
      </Link>
    </div>
  </div>
)

export default BandCard