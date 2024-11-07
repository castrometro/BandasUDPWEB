// src/components/InstrumentList.js
import React, { useState } from 'react';
import axios from 'axios';

const InstrumentList = ({ instrumentos, setInstrumentos }) => {
  const [nuevoInstrumento, setNuevoInstrumento] = useState('');
  const [error, setError] = useState(null);

  const handleAddInstrument = async () => {
    if (!nuevoInstrumento.trim()) {
      setError("Por favor, ingresa un nombre para el instrumento.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/users/add-instrument",
        { nombre: nuevoInstrumento },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Añadir el instrumento a la lista de instrumentos en el estado
      setInstrumentos([...instrumentos, response.data]);
      setNuevoInstrumento('');
      setError(null);
    } catch (err) {
      setError("Error al añadir el instrumento.");
    }
  };

  const handleDeleteInstrument = async (instrumentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/delete-instrument/${instrumentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Actualizar el estado eliminando el instrumento
      setInstrumentos(instrumentos.filter((inst) => inst.id_instrumento !== instrumentId));
    } catch (err) {
      setError("Error al eliminar el instrumento.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Instrumentos</h2>
      {error && <p className="text-red-500">{error}</p>}
      {instrumentos.length > 0 ? (
        <ul>
          {instrumentos.map((instrumento) => (
            <li key={instrumento.id_instrumento} className="flex justify-between items-center">
              {instrumento.nombre}
              <button
                onClick={() => handleDeleteInstrument(instrumento.id_instrumento)}
                className="text-red-500 ml-4"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay instrumentos disponibles</p>
      )}
      <div className="mt-4">
        <input
          type="text"
          value={nuevoInstrumento}
          onChange={(e) => setNuevoInstrumento(e.target.value)}
          placeholder="Nuevo Instrumento"
          className="border p-2 mr-2 rounded"
        />
        <button onClick={handleAddInstrument} className="bg-blue-500 text-white px-4 py-2 rounded">
          Añadir Instrumento
        </button>
      </div>
    </div>
  );
};

export default InstrumentList;
