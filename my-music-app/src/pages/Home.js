import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import Footer from '../components/Footer'
import logo from '../images/logo.png'
import salasEnsayoImage from '../images/SalasEnsayo-general.jpg'
import bandasGeneralImage from '../images/bandas-general.jpg'
import musicEventsImage from '../images/music-events.jpg'

export default function Home() {
  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/sala-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  const sections = [
    {
      title: "Salas de Ensayo",
      description: "Espacios equipados para que tu banda suene como nunca antes. Reserva ahora y lleva tu música al siguiente nivel.",
      backgroundImage: salasEnsayoImage,
      buttonText: "Reservar Sala",
      buttonLink: "/sala-de-ensayo"
    },
    {
      title: "Bandas UDP",
      description: "Descubre el talento musical de nuestra universidad. Conoce las bandas, sus géneros y próximas presentaciones.",
      backgroundImage: bandasGeneralImage,
      buttonText: "Ver Bandas",
      buttonLink: "/bandas-udp"
    },
    {
      title: "Eventos Musicales",
      description: "No te pierdas los próximos conciertos y festivales organizados por la comunidad UDP.",
      backgroundImage: musicEventsImage,
      buttonText: "Ver Calendario",
      buttonLink: "/calendario-salas"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerNavItems} logo={logo} />
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