import React from 'react'

const InformacionSala = () => {
  const informacion = {
    tamaño: "25 metros cuadrados",
    capacidad: "Hasta 6 personas",
    equipamiento: [
      "Batería completa",
      "2 amplificadores de guitarra",
      "1 amplificador de bajo",
      "Sistema de PA con 2 altavoces y mezcladora",
      "3 micrófonos con pedestales"
    ],
    implementaciones: [
      "Tratamiento acústico en paredes y techo",
      "Aire acondicionado",
      "Iluminación LED ajustable",
      "Pizarra para notación musical",
      "Estantería para almacenamiento de instrumentos"
    ],
    horario: "Lunes a Sábado, 10:00 AM - 10:00 PM",
    ubicacion: "Edificio de Artes, 2do piso, Sala 205"
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Características Generales</h3>
          <p><strong>Tamaño:</strong> {informacion.tamaño}</p>
          <p><strong>Capacidad:</strong> {informacion.capacidad}</p>
          <p><strong>Horario:</strong> {informacion.horario}</p>
          <p><strong>Ubicación:</strong> {informacion.ubicacion}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Equipamiento</h3>
          <ul className="list-disc pl-5">
            {informacion.equipamiento.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Implementaciones Adicionales</h3>
        <ul className="list-disc pl-5">
          {informacion.implementaciones.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InformacionSala