import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import Footer from '../components/Footer'
import BandCard from '../components/BandCard'

// Importa las imágenes
import losPortalesImage from '../images/los-portales.jpg'
import ecosDelCampusImage from '../images/ecos-del-campus.jpg'
import fusionAcademicaImage from '../images/fusion-academica.jpeg'
import ritmoUniversitarioImage from '../images/ritmo-universitario.jpg'
import musicBackgroundImage from '../images/music-background.jpg'
import logoImage from '../images/logo.png'

export default function BandasUDP() {
  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/sala-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  const bands = [
    {
      id: 1,
      name: "Los Portales",
      genre: "Rock Alternativo",
      image: losPortalesImage,
      nextPerformance: "15 de Mayo, 20:00 - Auditorio UDP"
    },
    {
      id: 2,
      name: "Ecos del Campus",
      genre: "Pop Indie",
      image: ecosDelCampusImage,
      nextPerformance: "22 de Mayo, 19:30 - Plaza Central UDP"
    },
    {
      id: 3,
      name: "Fusión Académica",
      genre: "Jazz Experimental",
      image: fusionAcademicaImage,
      nextPerformance: "1 de Junio, 21:00 - Club de Jazz"
    },
    {
      id: 4,
      name: "Ritmo Universitario",
      genre: "Reggae",
      image: ritmoUniversitarioImage,
      nextPerformance: "10 de Junio, 18:00 - Parque Forestal"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerNavItems} logo={logoImage} />
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