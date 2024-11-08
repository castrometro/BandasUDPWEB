import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UnirseBanda = ({ onBandaUnida }) => {
  const [bandas, setBandas] = useState([]);
  const [selectedBanda, setSelectedBanda] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBandas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/bandas');
        setBandas(response.data);
      } catch (err) {
        console.error('Error al obtener las bandas:', err);
        setError('No se pudieron cargar las bandas. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBandas();
  }, []);

  const handleUnirse = async () => {
    if (!selectedBanda) {
      setError('Por favor, selecciona una banda');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró el token de autenticación');

      const response = await axios.post(`http://localhost:5000/api/bandas/${selectedBanda.id_banda}/join`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      onBandaUnida(selectedBanda);
      setSelectedBanda(null);
    } catch (err) {
      console.error('Error al unirse a la banda:', err);
      setError('No se pudo unir a la banda. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && bandas.length === 0) {
    return <div className="text-center">Cargando bandas...</div>;
  }

  if (error && bandas.length === 0) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Unirse a una Banda</h3>
      {bandas.length > 0 ? (
        <div>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={selectedBanda ? selectedBanda.id_banda : ''}
            onChange={(e) => setSelectedBanda(bandas.find(b => b.id_banda === parseInt(e.target.value)))}
          >
            <option value="">Selecciona una banda</option>
            {bandas.map((banda) => (
              <option key={banda.id_banda} value={banda.id_banda}>
                {banda.nombre_banda}
              </option>
            ))}
          </select>
          <button
            onClick={handleUnirse}
            disabled={loading || !selectedBanda}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Uniéndose...' : 'Unirse a la Banda'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <p>No hay bandas disponibles para unirse.</p>
      )}
    </div>
  );
};

export default UnirseBanda;