import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import ReglamentoSala from '../components/ReglamentoSala'
import InformacionSala from '../components/InformacionSala'

import logo from '../images/logo.png'

export default function SalaDeEnsayo() {
  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Salas de ensayo", url: "/sala-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Sala de Ensayo</h1>
        
        <section className="mb-12">
          <SectionTitle title="Reglamento de la Sala" color="bg-red-600" />
          <ReglamentoSala />
        </section>

        <section>
          <SectionTitle title="Información de la Sala" color="bg-red-600" />
          <InformacionSala />
        </section>
      </main>
      <Footer />
    </div>
  )
}