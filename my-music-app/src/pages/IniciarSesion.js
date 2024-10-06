import React from 'react'
import Header from '../components/Header'
import LoginComponent from '../components/LoginComponent'
import Footer from '../components/Footer'
import logo from '../images/logo.png'

export default function IniciarSesion() {
  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/sala-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <LoginComponent />
        </div>
      </main>
      <Footer />
    </div>
  )
}