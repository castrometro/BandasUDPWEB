import React from 'react'

const ReglamentoSala = () => {
  const reglas = [
    "Reserva previa obligatoria a través del sistema de reservas.",
    "Máximo 2 horas de uso por sesión.",
    "Prohibido fumar, comer o beber dentro de la sala.",
    "Cuidar el equipamiento y reportar cualquier daño.",
    "Mantener el volumen a un nivel razonable.",
    "Dejar la sala limpia y ordenada después de su uso.",
    "Respetar los horarios de inicio y fin de la reserva.",
    "Solo miembros registrados de bandas UDP pueden usar la sala.",
    "Cancelar reservas con al menos 24 horas de anticipación.",
    "El incumplimiento de las reglas puede resultar en la pérdida del privilegio de uso."
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ul className="list-disc pl-5 space-y-2">
        {reglas.map((regla, index) => (
          <li key={index} className="text-gray-700">{regla}</li>
        ))}
      </ul>
    </div>
  )
}

export default ReglamentoSala