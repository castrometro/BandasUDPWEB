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
   
  
          <LoginComponent />

 
      <Footer />
    </div>
  )
}