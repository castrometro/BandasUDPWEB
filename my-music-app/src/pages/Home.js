import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import Footer from '../components/Footer'
import logo from '../images/logo.png'

export default function Home() {
  const headerNavItems = [
    { title: "Login", url: "/login" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  const sections = [
    {
      title: "Salas de Ensayo",
      description: "Espacios equipados para que tu banda suene como nunca antes. Reserva ahora y lleva tu música al siguiente nivel.",
      backgroundImage: "/images/rehearsal-room.jpg",
      buttonText: "Reservar Sala",
      buttonLink: "/salas-de-ensayo"
    },
    {
      title: "Bandas UDP",
      description: "Descubre el talento musical de nuestra universidad. Conoce las bandas, sus géneros y próximas presentaciones.",
      backgroundImage: "/images/udp-bands.jpg",
      buttonText: "Ver Bandas",
      buttonLink: "/bandas-udp"
    },
    {
      title: "Eventos Musicales",
      description: "No te pierdas los próximos conciertos y festivales organizados por la comunidad UDP.",
      backgroundImage: "/images/music-events.jpg",
      buttonText: "Ver Calendario",
      buttonLink: "/calendario-salas"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerNavItems} logo= {logo} />
      <main className="flex-grow">
        {sections.map((section, index) => (
          <Section 
            key={index}
            title={section.title}
            description={section.description}
            backgroundImage={section.backgroundImage}
            buttonText={section.buttonText}
            buttonLink={section.buttonLink}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}