import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Section from '../components/Section'
import logo from '../images/logo.png'
import imagen_sala from '../images/sala-ensayo-real.jpeg'
const SalaDeEnsayo = () => {
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
      <main className="flex-grow">
        <Section
          title="SALA DE ENSAYO TOESCA"
          description="23,9m²"
          backgroundImage={imagen_sala}
          buttonText="Reservar Ahora"
          buttonLink="/reservar"
        />
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">EQUIPAMIENTO SALA</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ul className="list-disc pl-5 space-y-2">
              <li>Batería Pearl Elx Export 5 piezas: 10" 12" 14" 14" 22"
                <ul className="list-none pl-5 mt-2">
                  <li>- Platillos: Crash, Ride y HH</li>
                </ul>
              </li>
              <li>Mixer Behringer Xenyx QX1222 USB</li>
              <li>Power Peavey Crown XLi 1500
                <ul className="list-none pl-5 mt-2">
                  <li>- Watts / Side a 8 ohmios: 350W.</li>
                  <li>- Watts / Side a 4 ohms: 450W.</li>
                </ul>
              </li>
              <li>2 Cajas JBL PRX415M 300 W</li>
              <li>Cabezal para bajo Hartke HA2500 250 W</li>
              <li>Gabinete para bajo Hartke VX410 BASS 400W</li>
              <li>Amplificador de Guitarra Laney IRON HEART IRT60-212</li>
              <li>1 Amplificador de Guitarra Orange Crush Pro 120 W</li>
            </ul>
            <p className="mt-4">(Puedes pedir 2 micrófonos sin costo en recepción)</p>
            <p className="mt-2 font-bold">*El equipamiento puede cambiar por mantención de los equipos</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SalaDeEnsayo