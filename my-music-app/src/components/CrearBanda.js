import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CrearBanda = ({ onBandaCreada }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaBanda, setNuevaBanda] = useState({
    nombre: '',
    descripcion: '',
    prox_eventos: ''
  });
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaBanda(prevState => ({ ...prevState, [name]: value }));
    setError(null);
    setExito(null);
  };

  const validarFormulario = () => {
    if (!nuevaBanda.nombre.trim()) return "El nombre de la banda es obligatorio";
    if (!nuevaBanda.descripcion.trim()) return "La descripción es obligatoria";
    if (!nuevaBanda.prox_eventos.trim()) return "La fecha del próximo evento es obligatoria";
    if (!/^\d{2}-\d{2}-\d{4}$/.test(nuevaBanda.prox_eventos)) return "El formato de fecha debe ser DD-MM-YYYY";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validarFormulario();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!user?.id_usuario) {
      setError("No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    setCargando(true);
    setError(null);
    setExito(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró el token de autenticación');

      const response = await axios.post('http://localhost:5000/api/bandas', nuevaBanda, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      onBandaCreada(response.data);
      setExito("Banda creada exitosamente. Eres el líder de esta banda.");
      setMostrarFormulario(false);
      setNuevaBanda({ nombre: '', descripcion: '', prox_eventos: '' });
    } catch (err) {
      console.error('Error al crear la banda:', err);
      if (err.response && err.response.data && err.response.data.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError("Error al crear la banda. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mt-6">
      <button 
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
          if (!mostrarFormulario) {
            setError(null);
            setExito(null);
            setNuevaBanda({ nombre: '', descripcion: '', prox_eventos: '' });
          }
        }}
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {mostrarFormulario ? 'Cancelar' : 'Crear Banda'}
      </button>
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la banda
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nuevaBanda.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el nombre de la banda"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                id="descripcion"
                value={nuevaBanda.descripcion}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describa el género y estilo de la banda"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="prox_eventos" className="block text-sm font-medium text-gray-700 mb-1">
                Próximos eventos
              </label>
              <input
                type="text"
                name="prox_eventos"
                id="prox_eventos"
                value={nuevaBanda.prox_eventos}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>
          {error && (
            <div className="sm:col-span-2">
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          )}
          {exito && (
            <div className="sm:col-span-2">
              <p className="text-green-500 text-sm mt-1">{exito}</p>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setMostrarFormulario(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={cargando}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {cargando ? 'Creando...' : 'Crear Banda'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CrearBanda;