import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, selectedSlot, bandas }) => {
  const [selectedSala, setSelectedSala] = useState(''); // Sala seleccionada
  const [selectedBanda, setSelectedBanda] = useState(''); // Banda seleccionada

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedSala || !selectedBanda) {
      alert('Por favor, selecciona una sala y una banda antes de confirmar.');
      return;
    }
    onConfirm(selectedSala, selectedBanda); // Llama a la función de confirmación pasando sala y banda
    onClose(); // Cierra el modal
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-80">
        <button
          className="absolute top-2 right-2 text-black font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            Desea tomar: <br />
            {selectedSlot?.day}, {selectedSlot?.time}
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Selecciona una sala:
            </label>
            <select
              value={selectedSala}
              onChange={(e) => setSelectedSala(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="" disabled>
                -- Selecciona una sala --
              </option>
              <option value="Toesca">Toesca</option>
              <option value="Huechuraba">Huechuraba</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Selecciona una banda:
            </label>
            <select
              value={selectedBanda}
              onChange={(e) => setSelectedBanda(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="" disabled>
                -- Selecciona una banda --
              </option>
              {bandas.map((banda) => (
                <option key={banda.id_banda} value={banda.id_banda}>
                  {banda.nombre_banda}
                </option>
              ))}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
