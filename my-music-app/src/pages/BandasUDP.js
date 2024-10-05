import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Section from '../components/Section'
import Footer from '../components/Footer'
import logo from '../images/logo.png'


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

export default function BandasUDP() {
  const headerNavItems = [
    { title: "Login", url: "/login" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  const bands = [
    {
      id: 1,
      name: "Los Portales",
      genre: "Rock Alternativo",
      image: "/images/los-portales.jpg",
      nextPerformance: "15 de Mayo, 20:00 - Auditorio UDP"
    },
    {
      id: 2,
      name: "Ecos del Campus",
      genre: "Pop Indie",
      image: "/images/ecos-del-campus.jpg",
      nextPerformance: "22 de Mayo, 19:30 - Plaza Central UDP"
    },
    {
      id: 3,
      name: "Fusión Académica",
      genre: "Jazz Experimental",
      image: "/images/fusion-academica.jpg",
      nextPerformance: "1 de Junio, 21:00 - Club de Jazz"
    },
    {
      id: 4,
      name: "Ritmo Universitario",
      genre: "Reggae",
      image: "/images/ritmo-universitario.jpg",
      nextPerformance: "10 de Junio, 18:00 - Parque Forestal"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow">
        <div id="bands-list" className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Bandas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bands.map((band) => (
              <BandCard key={band.id} {...band} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}